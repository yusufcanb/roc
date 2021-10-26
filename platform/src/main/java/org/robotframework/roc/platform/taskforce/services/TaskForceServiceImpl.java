package org.robotframework.roc.platform.taskforce.services;

import lombok.SneakyThrows;
import org.robotframework.roc.core.exceptions.ProjectNotFoundException;
import org.robotframework.roc.core.models.Project;
import org.robotframework.roc.core.models.TaskForce;
import org.robotframework.roc.core.services.TaskForceService;
import org.robotframework.roc.platform.project.repository.ProjectRepository;
import org.robotframework.roc.platform.taskforce.repository.TaskForceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskForceServiceImpl implements TaskForceService {

    private final TaskForceRepository taskForceRepository;
    private final ProjectRepository projectRepository;

    public TaskForceServiceImpl(ProjectRepository projectRepository, TaskForceRepository taskForceRepository) {
        this.taskForceRepository = taskForceRepository;
        this.projectRepository = projectRepository;
    }

    @Override
    public List<TaskForce> getTaskForcesByProject(Long projectId) {
        return taskForceRepository.findAll();
    }

    @Override
    public Optional<TaskForce> getTaskForceById(Long taskForceId) {
        return taskForceRepository.findById(taskForceId);
    }

    @Override
    public TaskForce updateTaskForce(Long id, TaskForce taskForce) {
        return taskForceRepository.save(taskForce);
    }

    @Override
    public TaskForce createTaskForce(Long projectId, TaskForce taskForce) throws ProjectNotFoundException {
        Optional<Project> project = projectRepository.findById(projectId);
        if (!project.isPresent()) {
            throw new ProjectNotFoundException();
        }
        taskForce.setProject(project.get());
        return taskForceRepository.save(taskForce);
    }

    @Override
    public void deleteTaskForce(TaskForce taskForce) {
        taskForceRepository.delete(taskForce);
    }

    @Override
    public void deleteTaskForceById(Long id) {
        taskForceRepository.deleteById(id);
    }
}
