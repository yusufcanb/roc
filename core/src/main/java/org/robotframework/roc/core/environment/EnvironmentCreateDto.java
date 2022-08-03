package org.robotframework.roc.core.environment;

import lombok.Data;

import java.util.List;

@Data
public class EnvironmentCreateDto {
    private String name;
    private List<String> tags;
    private String yaml;
}
