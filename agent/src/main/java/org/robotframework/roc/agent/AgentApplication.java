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
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.socket.client.WebSocketClient;
import picocli.CommandLine;

@SpringBootApplication
@Slf4j
public class AgentApplication {

    public static void main(String[] args) {
        AgentParameters parameters = new AgentParameters();

        CommandLine cli = new CommandLine(parameters);
        cli.parseArgs(args);

        System.setProperty("roc.platform.host", parameters.getHost());
        System.setProperty("roc.platform.port", parameters.getPort().toString());
        System.setProperty("roc.agent.id", parameters.getAgentId());

        log.info("Agent initialization finished: {}", String.join(" ", args));
        SpringApplication.run(AgentApplication.class, args);
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }


    @Bean
    public CommandLineRunner initAgent(ApplicationContext context) {
        return (String[] args) -> {
            AgentRuntime runtime = context.getBean(AgentRuntime.class);
            runtime.initRuntime();
            runtime.agentMainLoop();
        };
    }

}

