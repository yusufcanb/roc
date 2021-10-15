package org.robotframework.roc.platform.taskforce.services;

import org.robotframework.roc.core.models.TaskForce;
import org.robotframework.roc.core.services.TaskForceService;
import org.robotframework.roc.platform.taskforce.repository.TaskForceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskForceServiceImpl implements TaskForceService {

    private final TaskForceRepository taskForceRepository;

    public TaskForceServiceImpl(TaskForceRepository taskForceRepository) {
        this.taskForceRepository = taskForceRepository;
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
    public TaskForce saveTaskForce(TaskForce taskForce) {
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