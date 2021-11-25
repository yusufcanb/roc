package org.robotframework.roc.agent;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.client.RestTemplate;

@Configuration
@EnableScheduling
@Slf4j
public class HealthCheck {

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    AgentRuntime runtime;

    @Scheduled(fixedDelay = 2500)
    public void agentHeartBeat() {
        Long id = Long.valueOf(System.getProperty("roc.agent.id"));
        String host = System.getProperty("roc.platform.host");
        String port = System.getProperty("roc.platform.port");
        restTemplate.execute(String.format("http://%s:%s/api/v1/agent/%s/health-check", host, port, id), HttpMethod.POST, null, null);
        log.debug("Health check task execution finished, Device: {}");
    }
}
