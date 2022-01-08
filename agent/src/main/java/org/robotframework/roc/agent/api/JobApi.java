package org.robotframework.roc.agent.api;

import org.apache.coyote.Response;
import org.robotframework.roc.core.beans.JobStatus;
import org.robotframework.roc.core.dto.job.JobStatusUpdateDto;
import org.robotframework.roc.core.models.Job;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

public class JobApi extends Api {

    final String endpoint = String.format("http://%s/api/v1/job", this.getBaseUrl());

    public Optional<Job> getJobById(Long id) {
        ResponseEntity<Job> response = this.getRestTemplate().getForEntity(endpoint + "/" + id.toString(), Job.class);
        return Optional.ofNullable(response.getBody());
    }

    public boolean updateJobStatus(Long jobId, JobStatus status) {
        JobStatusUpdateDto dto = new JobStatusUpdateDto();
        dto.setJobStatus(status);
        ResponseEntity<Job> response = this.getRestTemplate().postForEntity(endpoint + "/" + jobId.toString() + "/status", dto, Job.class);
        return response.getStatusCode() == HttpStatus.OK;
    }

    public boolean uploadJobReport(Long id, Path cwd) {
        HttpHeaders headers = new org.springframework.http.HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", new FileSystemResource(Paths.get(cwd.toString(), "output", "log.html")));

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        ResponseEntity<String> response = this.getRestTemplate().postForEntity(endpoint + "/" + id + "/report", requestEntity, String.class);
        return response.getStatusCode() == HttpStatus.OK;
    }

}
