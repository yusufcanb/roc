package org.robotframework.roc.core.taskforce;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.LinkedList;
import java.util.List;

@Data
public class TaskForceCreateDto {

    @NotNull
    String projectId;

    @NotNull
    @Pattern(regexp = "^[a-z0-9-]+$", flags = Pattern.Flag.UNICODE_CASE)
    private String name;
    private String description;

    private List<String> tags = new LinkedList<>();

}
