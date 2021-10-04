package org.robotframework.roc.platform.job.services;

import org.robotframework.roc.core.models.Job;
import org.robotframework.roc.core.services.JobService;
import org.robotframework.roc.platform.job.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;

    public JobServiceImpl(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
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
