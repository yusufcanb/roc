package org.robotframework.roc.core.environment;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.List;

@Data
public class EnvironmentCreateDto {

    @NotNull
    @Pattern(regexp = "^[a-z0-9-]+$", flags = Pattern.Flag.UNICODE_CASE)
    private String name;

    private List<String> tags;

    @NotNull
    @YAMLConstraint
    private String yaml;
}
