package org.robotframework.roc.platform.job.services;

import org.robotframework.roc.core.models.Job;
import org.robotframework.roc.core.services.JobService;
import org.robotframework.roc.platform.job.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;

    private final SimpMessagingTemplate messagingTemplate;

    public JobServiceImpl(JobRepository jobRepository, SimpMessagingTemplate simpMessagingTemplate) {
        this.jobRepository = jobRepository;
        this.messagingTemplate = simpMessagingTemplate;
    }

    @Override
    public List<Job> getJobsByProject(Long projectId) {
        return null;
    }

    @Override
    public Job getJobById(Long jobId) {
        return null;
    }

    @Override
    public Job saveJob(Job job) {
        String queueName = String.format("/queue/events.%s", job.getFactory().getId());
        messagingTemplate.convertAndSend(queueName, "[]");
        return jobRepository.save(job);
    }

    @Override
    public Job updateJob(Job job) {
        return null;
    }

    @Override
    public void deleteJob() {

    }
}
