package org.robotframework.roc.platform.job.services;

import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.robotframework.roc.core.dto.job.JobCreateRequestBody;
import org.robotframework.roc.core.dto.stomp.StompPayload;
import org.robotframework.roc.core.exceptions.ProjectNotFoundException;
import org.robotframework.roc.core.models.*;
import org.robotframework.roc.core.services.JobService;
import org.robotframework.roc.platform.agent.repositories.AgentRepository;
import org.robotframework.roc.platform.environment.repositories.EnvironmentRepository;
import org.robotframework.roc.platform.job.repository.JobRepository;
import org.robotframework.roc.platform.project.repository.ProjectRepository;
import org.robotframework.roc.platform.taskforce.repository.TaskForceRepository;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
public class JobServiceImpl implements JobService {

    private final ProjectRepository projectRepository;
    private final AgentRepository agentRepository;
    private final TaskForceRepository taskForceRepository;
    private final EnvironmentRepository environmentRepository;
    private final JobRepository jobRepository;
    private final SimpMessagingTemplate messagingTemplate;

    public JobServiceImpl(ProjectRepository projectRepository,
                          AgentRepository agentRepository,
                          EnvironmentRepository environmentRepository,
                          TaskForceRepository taskForceRepository,
                          JobRepository jobRepository,
                          SimpMessagingTemplate simpMessagingTemplate) {
        this.projectRepository = projectRepository;
        this.jobRepository = jobRepository;
        this.agentRepository = agentRepository;
        this.taskForceRepository = taskForceRepository;
        this.environmentRepository = environmentRepository;
        this.messagingTemplate = simpMessagingTemplate;
    }

    @Override
    public List<Job> getJobsByProject(Long projectId) {
        return jobRepository.findAll();
    }

    @Override
    public Optional<Job> getJobById(Long jobId) {
        return jobRepository.findById(jobId);
    }

    @Override
    public Job createJob(Long projectId, JobCreateRequestBody jobDto) throws ProjectNotFoundException {
        Optional<Project> project = projectRepository.findById(projectId);
        Optional<Agent> agent = agentRepository.findById(jobDto.getAgentId());
        Optional<TaskForce> taskForce = taskForceRepository.findById(jobDto.getTaskForceId());
        Optional<Environment> environment = environmentRepository.findById(jobDto.getEnvironmentId());

        if (!project.isPresent()) {
            throw new ProjectNotFoundException();
        } else {
            Job job = new Job();

            job.setName(jobDto.getName());
            job.setEnvironment(environment.get());
            job.setAgent(agent.get());
            job.setTaskForce(taskForce.get());
            job.setCreatedAt(new Date());

            job = jobRepository.save(job);
            String queueName = String.format("agent-%s", job.getAgent().getId());
            messagingTemplate.convertAndSend(queueName, "[]");
            return job;
        }
    }

    @Override
    public Job createJob(Job job) {
        job = jobRepository.save(job);

        String queueName = String.format("/queue/events.%s", job.getAgent().getId());

        StompPayload payload = new StompPayload();
        payload.setJobId(job.getId());
        payload.setEventType("JOB_CREATED");

        Map<String, Object> headers = new HashMap<>();
        headers.put("receipt", "");
        headers.put("ack", "none");

        Gson g = new Gson();
        messagingTemplate.convertAndSend(queueName, g.toJson(payload), headers);
        log.info("Message sent to: {}", queueName);
        return job;
    }

}

