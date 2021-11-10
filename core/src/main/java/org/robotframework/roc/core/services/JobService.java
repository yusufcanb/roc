package org.robotframework.roc.core.services;

import org.robotframework.roc.core.dto.job.JobCreateRequestBody;
import org.robotframework.roc.core.exceptions.ProjectNotFoundException;
import org.robotframework.roc.core.models.Job;

import java.util.List;
import java.util.Optional;

public interface JobService {

    List<Job> getJobsByProject(Long projectId);

    Job createJob(Long projectId, JobCreateRequestBody job) throws ProjectNotFoundException;

    Job createJob(Job job);

    Optional<Job> getJobById(Long jobId);


}
