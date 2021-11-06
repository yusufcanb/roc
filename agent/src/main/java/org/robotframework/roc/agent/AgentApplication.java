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
import org.robotframework.roc.agent.payload.StompPayload;
import org.robotframework.roc.agent.resource.JobResource;
import org.robotframework.roc.core.models.Job;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;
import picocli.CommandLine;

import java.util.Optional;


@SpringBootApplication
@Slf4j
public class AgentApplication {

    @Autowired
    private EventQueue queue;

    @Autowired
    private JobResource jobResource;

    public static void main(String[] args) {
        SpringApplication.run(AgentApplication.class, args);
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public CommandLineRunner initAgent(@Autowired AgentParameters params) {
        return (String[] args) -> {
            CommandLine cli = new CommandLine(params);
            cli.parseArgs(args);
            while (true) {
                if (!queue.getQueue().isEmpty()) {
                    StompPayload payload = queue.getQueue().poll();
                    Optional<Job> job = jobResource.getJobById(Long.valueOf(payload.getJobId()));
                    if (job.isPresent()) {
                        Job j = job.get();
                        log.info("<Job {}>, with [Environment: {}, TaskForce: {}]", j.getId(), j.getEnvironment().getName(), j.getTaskForce().getId());
                    }
//                    Path destPath = Paths.get(System.getProperty("user.home"), ".roc-agent", "rcc.exe");
//                    ZipUtils.copyResource("/windows/rcc.exe", destPath.toString(), this.getClass());
                }
            }
        };
    }
}