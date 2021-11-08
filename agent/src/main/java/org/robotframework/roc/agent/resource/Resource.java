package org.robotframework.roc.agent.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;

public class Resource {
    @Value("${roc.platform.host}")
    protected String host;

    @Value("${roc.platform.port}")
    protected Integer port;

    @Autowired
    protected RestTemplate restTemplate;

}
