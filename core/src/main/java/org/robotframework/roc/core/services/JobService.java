package org.robotframework.roc.core.services;

import org.robotframework.roc.core.models.Job;

import java.util.List;

public interface JobService {

    List<Job> getJobsByProject(Long projectId);

    Job getJobById(Long jobId);

    Job saveJob(Job job);

    Job updateJob(Job job);

    void deleteJob();
}
