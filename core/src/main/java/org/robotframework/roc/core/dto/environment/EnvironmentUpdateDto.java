package org.robotframework.roc.core.dto.environment;

import lombok.Data;

@Data
public class EnvironmentUpdateDto {
    private String name;
    private String description;
    private String code;
}
