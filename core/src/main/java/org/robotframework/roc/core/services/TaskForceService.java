package org.robotframework.roc.core.services;

import org.robotframework.roc.core.models.TaskForce;

import java.util.List;
import java.util.Optional;

public interface TaskForceService {

    List<TaskForce> getTaskForcesByProject(Long projectId);

    Optional<TaskForce> getTaskForceById(Long taskForceId);

    TaskForce updateTaskForce(Long id, TaskForce taskForce);

    TaskForce saveTaskForce(TaskForce taskForce);

    void deleteTaskForce(TaskForce taskForce);

    void deleteTaskForceById(Long id);
}
