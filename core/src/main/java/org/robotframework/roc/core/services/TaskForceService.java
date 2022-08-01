package org.robotframework.roc.core.services;

import org.robotframework.roc.core.dto.TaskForceUpdateDto;
import org.robotframework.roc.core.exceptions.ProjectNotFoundException;
import org.robotframework.roc.core.models.Job;
import org.robotframework.roc.core.models.TaskForce;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface TaskForceService {

    List<TaskForce> getTaskForcesByProject(Long projectId);

    Optional<TaskForce> getTaskForceById(Long taskForceId);

    TaskForce updateTaskForce(TaskForce taskForce);

    TaskForce updateTaskForce(Long id, TaskForceUpdateDto taskForce);

    TaskForce updateTaskForce(TaskForce taskForce, TaskForceUpdateDto dto);

    void uploadTaskForcePackage(TaskForce taskForce, MultipartFile file) throws Exception;

    Job executeTaskForce(TaskForce taskForce, Long environmentId, Long agentId);

    TaskForce createTaskForce(Long projectId, TaskForce taskForce) throws ProjectNotFoundException;

    void deleteTaskForce(TaskForce taskForce);

    void deleteTaskForceById(Long id);
}
