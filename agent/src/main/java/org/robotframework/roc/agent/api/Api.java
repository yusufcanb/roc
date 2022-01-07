package org.robotframework.roc.agent.api;

import lombok.Getter;
import org.springframework.web.client.RestTemplate;

public abstract class Api {

    @Getter
    private final String host = System.getProperty("roc.platform.host");

    @Getter
    private final Integer port = Integer.valueOf(System.getProperty("roc.platform.port"));

    @Getter
    private final RestTemplate restTemplate = new RestTemplate();

    String getBaseUrl() {
        return String.format("%s:%s", this.getHost(), this.getPort());
    }

}
