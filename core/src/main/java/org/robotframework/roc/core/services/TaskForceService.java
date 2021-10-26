package org.robotframework.roc.core.services;

import org.robotframework.roc.core.exceptions.ProjectNotFoundException;
import org.robotframework.roc.core.models.TaskForce;

import java.util.List;
import java.util.Optional;

public interface TaskForceService {

    List<TaskForce> getTaskForcesByProject(Long projectId);

    Optional<TaskForce> getTaskForceById(Long taskForceId);

    TaskForce updateTaskForce(Long id, TaskForce taskForce);

    TaskForce createTaskForce(Long projectId, TaskForce taskForce) throws ProjectNotFoundException;

    void deleteTaskForce(TaskForce taskForce);

    void deleteTaskForceById(Long id);
}
