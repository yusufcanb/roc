package org.robotframework.roc.core.job;

import org.robotframework.roc.core.project.ProjectNotFoundException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface JobService {

    Job save(Job j);

    List<Job> getJobsByProject(Long projectId);

    List<Job> getJobsByTaskForce(String taskForceId);

    Job createJob(Long projectId, JobCreateRequestBody job) throws ProjectNotFoundException;

    Job createJob(Job job);

    Optional<Job> getJobById(Long jobId);

    void saveJobReport(Job job, MultipartFile file) throws Exception;
}
