package org.robotframework.roc.agent.api;

import org.robotframework.roc.core.beans.JobStatus;
import org.robotframework.roc.core.models.Job;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

public class JobApi extends Api {

    final String endpoint = String.format("http://%s/api/v1/job", this.getBaseUrl());

    public Optional<Job> getJobById(Long id) {
        ResponseEntity<Job> response = this.getRestTemplate().getForEntity(endpoint + "/" + id.toString(), Job.class);
        return Optional.ofNullable(response.getBody());
    }

    public void updateJobStatus(Long jobId, JobStatus status) {

    }

}
