package org.robotframework.roc.core.taskforce;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskForceUpdateDto {
    private Long projectId;
    private String name;
    private String robot;
    private String sourceType;
    private String repositoryUrl;
}
