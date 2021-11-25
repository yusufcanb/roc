package org.robotframework.roc.agent.resource;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

public class Resource {

    @Getter
    private String host = System.getProperty("roc.platform.host");

    @Getter
    private Integer port = Integer.valueOf(System.getProperty("roc.platform.port"));

    @Autowired
    protected RestTemplate restTemplate;


}
