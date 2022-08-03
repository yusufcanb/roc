package org.robotframework.roc.core.taskforce;

import org.robotframework.roc.core.project.ProjectNotFoundException;
import org.robotframework.roc.core.job.Job;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface TaskForceService {

    List<TaskForce> getTaskForcesByProject(Long projectId);

    Optional<TaskForce> getTaskForceById(String taskForceId);

    TaskForce updateTaskForce(TaskForce taskForce);

    TaskForce updateTaskForce(String id, TaskForceUpdateDto taskForce);

    TaskForce updateTaskForce(TaskForce taskForce, TaskForceUpdateDto dto);

    void uploadTaskForcePackage(TaskForce taskForce, MultipartFile file) throws Exception;

    Job executeTaskForce(TaskForce taskForce, Long environmentId, Long agentId);

    TaskForce createTaskForce(Long projectId, TaskForce taskForce) throws ProjectNotFoundException;

    void deleteTaskForce(TaskForce taskForce);

    void deleteTaskForceById(String id);
}
