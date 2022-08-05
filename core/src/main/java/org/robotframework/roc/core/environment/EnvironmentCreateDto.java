package org.robotframework.roc.core.environment;

import lombok.Data;
import org.robotframework.roc.core.validation.YAMLConstraint;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.LinkedList;
import java.util.List;

@Data
public class EnvironmentCreateDto {

    @NotNull
    @Pattern(regexp = "^[a-z0-9-]+$", flags = Pattern.Flag.UNICODE_CASE)
    private String name;

    private String description;

    @NotNull
    private List<String> tags = new LinkedList<>();

    @NotNull
    @YAMLConstraint
    private String yaml;
}
