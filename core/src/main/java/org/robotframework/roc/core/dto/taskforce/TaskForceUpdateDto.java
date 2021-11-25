package org.robotframework.roc.core.dto.taskforce;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskForceUpdateDto {
    private Long projectId;
    private String name;
    private String sourceType;
    private String repositoryUrl;
}
