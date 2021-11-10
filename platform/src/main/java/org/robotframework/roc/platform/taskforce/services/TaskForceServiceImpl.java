package org.robotframework.roc.platform.taskforce.services;

import org.robotframework.roc.core.exceptions.ProjectNotFoundException;
import org.robotframework.roc.core.models.*;
import org.robotframework.roc.core.services.JobService;
import org.robotframework.roc.core.services.TaskForceService;
import org.robotframework.roc.platform.agent.repositories.AgentRepository;
import org.robotframework.roc.platform.environment.repositories.EnvironmentRepository;
import org.robotframework.roc.platform.project.repository.ProjectRepository;
import org.robotframework.roc.platform.taskforce.repository.TaskForceRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class TaskForceServiceImpl implements TaskForceService {

    private final EnvironmentRepository environmentRepository;
    private final AgentRepository agentRepository;
    private final TaskForceRepository taskForceRepository;

    private final ProjectRepository projectRepository;
    private final JobService jobService;

    public TaskForceServiceImpl(ProjectRepository projectRepository,
                                TaskForceRepository taskForceRepository,
                                AgentRepository agentRepository,
                                EnvironmentRepository environmentRepository,
                                JobService jobService
    ) {
        this.taskForceRepository = taskForceRepository;
        this.projectRepository = projectRepository;
        this.agentRepository = agentRepository;
        this.environmentRepository = environmentRepository;
        this.jobService = jobService;
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
    public Job executeTaskForce(TaskForce taskForce, Long environmentId, Long agentId) {
        Optional<Environment> optionalEnvironment = environmentRepository.findById(environmentId);
        Optional<Agent> optionalAgent = agentRepository.findById(agentId);

        if (optionalAgent.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Agent does not exists", null);
        } else if (optionalEnvironment.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Environment does not exists", null);
        } else {
            Job job = new Job();

            job.setTaskForce(taskForce);
            job.setEnvironment(optionalEnvironment.get());
            job.setAgent(optionalAgent.get());

            return jobService.createJob(job);
        }
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
