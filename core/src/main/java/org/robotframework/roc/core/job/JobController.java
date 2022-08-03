package org.robotframework.roc.core.job;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface JobController {

    ResponseEntity<List<Job>> getJobsByProject(@RequestParam Long projectId);

    ResponseEntity<Job> createJob(@RequestParam Long projectId, @RequestBody JobCreateRequestBody requestBody);

    ResponseEntity<Job> getJobById(@PathVariable Long jobId);

}
