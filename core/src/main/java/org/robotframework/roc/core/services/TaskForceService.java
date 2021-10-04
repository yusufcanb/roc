package org.robotframework.roc.core.services;

import org.robotframework.roc.core.models.TaskForce;

import java.util.List;

public interface TaskForceService {

    List<TaskForce> getTaskForcesByProject(Long projectId);

    TaskForce getTaskForceById(Long taskForceId);

    TaskForce updateTaskForce(TaskForce taskForce);

    TaskForce saveTaskForce(TaskForce taskForce);

    void deleteTaskForce(TaskForce taskForce);

    void deleteTaskForceById(Long id);
}
