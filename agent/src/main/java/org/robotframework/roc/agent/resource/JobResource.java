package org.robotframework.roc.agent.resource;

import org.robotframework.roc.core.beans.JobStatus;
import org.robotframework.roc.core.dto.job.JobStatusUpdateDto;
import org.robotframework.roc.core.models.Job;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class JobResource extends Resource {

    public Optional<Job> getJobById(Long id) {
        String url = String.format("http://%s:%s/api/v1/job", this.getHost(), this.getPort());
        ResponseEntity<Job> response = this.restTemplate.getForEntity(String.format("%s/%s", url, id.toString()), Job.class);
        if (response.getStatusCodeValue() == 200) {
            return Optional.of(response.getBody());
        } else {
            return Optional.empty();
        }
    }

    public void updateJobStatus(Long id, JobStatus status) {
        String url = String.format("http://%s:%s/api/v1/job/%s/status", this.getHost(), this.getPort(), id);

        JobStatusUpdateDto jobStatusDto = new JobStatusUpdateDto();
        jobStatusDto.setJobStatus(status);

        HttpEntity<JobStatusUpdateDto> request = new HttpEntity<>(jobStatusDto);
        this.restTemplate.postForEntity(url, request, Object.class);
    }

    public void updateJobExecutionReport(Long id) {

    }

}
