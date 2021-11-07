package org.robotframework.roc.agent.resource;

import org.robotframework.roc.core.models.Job;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class JobResource extends Resource {

    public Optional<Job> getJobById(Long id) {
        String url = String.format("http://%s:%s/job", this.host, this.port);
        ResponseEntity<Job> response = this.restTemplate.getForEntity(String.format("%s/%s", url, id.toString()), Job.class);
        if (response.getStatusCodeValue() == 200) {
            return Optional.of(response.getBody());
        } else {
            return Optional.empty();
        }
    }

    public void updateJobStatus(Long id, String status) {

    }

    public void updateJobExecutionReport(Long id) {

    }

}
