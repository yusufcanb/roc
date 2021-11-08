/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

package org.robotframework.roc.agent;

import lombok.extern.slf4j.Slf4j;
import org.robotframework.roc.agent.job.SimpleJobRunner;
import org.robotframework.roc.agent.payload.StompPayload;
import org.robotframework.roc.agent.resource.JobResource;
import org.robotframework.roc.core.models.Job;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.task.TaskExecutor;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.Optional;

@SpringBootApplication
@Slf4j
public class AgentApplication {

    @Autowired
    private TaskExecutor taskExecutor;

    @Autowired
    private EventQueue queue;

    @Autowired
    private JobResource jobResource;

    @Autowired
    private SimpleJobRunner simpleJobRunner;

    public static void main(String[] args) {
        SpringApplication.run(AgentApplication.class, args);
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public CommandLineRunner initAgent(@Autowired AgentRuntime agentRuntime) {
        return (String[] args) -> {
            agentRuntime.initRuntime(args);
            while (true) {
                if (!queue.getQueue().isEmpty()) {
                    StompPayload payload = queue.getQueue().poll();
                    Optional<Job> job = jobResource.getJobById(Long.valueOf(payload.getJobId()));
                    if (job.isPresent()) {
                        Job j = job.get();
                        log.info("<Job {}>, with [Environment: {}, TaskForce: {}]",
                                j.getId(),
                                j.getEnvironment().getName(),
                                j.getTaskForce().getId());
                        taskExecutor.execute(() -> {
                            try {
                                simpleJobRunner.run(j);
                            } catch (IOException exception) {
                                exception.printStackTrace();
                            }
                        });
                    }
                }
            }
        };
    }
}

