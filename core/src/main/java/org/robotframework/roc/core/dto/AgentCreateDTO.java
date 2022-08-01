package org.robotframework.roc.core.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class AgentCreateDTO {
    private String name;

    private String hostName;
    private String platform;
    private String version;
    private String dockerVersion;

    private List<String> tags = new ArrayList<>();
}
