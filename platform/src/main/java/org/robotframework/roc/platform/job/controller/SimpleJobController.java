package org.robotframework.roc.platform.job.controller;

import org.robotframework.roc.core.controllers.JobController;
import org.robotframework.roc.core.dto.job.JobCreateRequestBody;
import org.robotframework.roc.core.dto.job.JobStatusUpdateDto;
import org.robotframework.roc.core.exceptions.ProjectNotFoundException;
import org.robotframework.roc.core.models.Job;
import org.robotframework.roc.core.models.TaskForce;
import org.robotframework.roc.core.services.JobService;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class SimpleJobController implements JobController {

    final
    JobService jobService;

    public SimpleJobController(JobService jobService) {
        this.jobService = jobService;
    }

    @RequestMapping(value = "/job", method = RequestMethod.GET)
    @Override
    public ResponseEntity<List<Job>> getJobsByProject(@RequestParam Long projectId) {
        return new ResponseEntity<>(jobService.getJobsByProject(projectId), HttpStatus.OK);
    }

    @RequestMapping(value = "/job", method = RequestMethod.POST)
    @Override
    public ResponseEntity<Job> createJob(@RequestParam Long projectId, @RequestBody JobCreateRequestBody body) {
        try {
            return new ResponseEntity<>(jobService.createJob(projectId, body), HttpStatus.OK);
        } catch (ProjectNotFoundException projectNotFoundException) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Project does not exists", null);
        }
    }

    @RequestMapping(value = "/job/{id}", method = RequestMethod.GET)
    @Override
    public ResponseEntity<Job> getJobById(@PathVariable Long id) {
        Optional<Job> job = jobService.getJobById(id);
        if (job.isPresent()) {
            return new ResponseEntity<>(job.get(), HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Job does not found", null);
        }
    }

    @RequestMapping(value = "/job/{id}/status", method = RequestMethod.POST)
    public ResponseEntity<Job> updateJobStatusById(@PathVariable Long id, @RequestBody JobStatusUpdateDto dto) {
        Optional<Job> job = jobService.getJobById(id);
        if (job.isPresent()) {
            job.get().setStatus(dto.getJobStatus());
            jobService.save(job.get());
            return new ResponseEntity<>(job.get(), HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Job does not found", null);
        }
    }

    @RequestMapping(value = "/job/{id}/report", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> uploadJobReport(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        Optional<Job> jobOptional = jobService.getJobById(id);
        if (jobOptional.isPresent()) {
            try {
                jobService.saveJobReport(jobOptional.get(), file);
                return new ResponseEntity<>("{'success': true}", HttpStatus.OK);
            } catch (Exception e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Object storage connection failed.", e);
            }
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Job does not exists", null);
        }
    }

    @RequestMapping(value = "/job/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Job> updateJob(@PathVariable Long id) {
        return new ResponseEntity<>(null, HttpStatus.NOT_IMPLEMENTED);
    }

    @RequestMapping(value = "/job/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Job> deleteJob(@PathVariable Long id) {
        return new ResponseEntity<>(null, HttpStatus.NOT_IMPLEMENTED);
    }
}
