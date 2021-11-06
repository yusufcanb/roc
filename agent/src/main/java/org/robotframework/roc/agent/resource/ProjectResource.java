package org.robotframework.roc.agent.resource;

import org.springframework.stereotype.Component;

@Component
public class ProjectResource extends Resource {

    private String url = String.format("http://%s:%s/project", host, port);

}
