package org.robotframework.roc.platform.taskforce.controllers;

import org.robotframework.roc.core.models.Job;
import org.robotframework.roc.core.models.TaskForce;
import org.robotframework.roc.core.services.JobService;
import org.robotframework.roc.core.services.TaskForceService;
import org.robotframework.roc.platform.taskforce.dto.ExecuteTaskForceDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.ArrayList;
import java.util.List;

@Controller
public class TaskForceController {

    private final TaskForceService taskForceService;

    private final JobService jobService;

    public TaskForceController(TaskForceService taskForceService, JobService jobService) {

        this.taskForceService = taskForceService;
        this.jobService = jobService;
    }

    @RequestMapping(value = "/task-force", method = RequestMethod.GET)
    public ResponseEntity<List<Object>> getTaskForces() {
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
    }

    @RequestMapping(value = "/task-force/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> getTaskForceById() {
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
    }

    @RequestMapping(value = "/task-force/{id}/execute", method = RequestMethod.POST)
    public ResponseEntity<Job> executeTaskForce(@PathVariable Long id, @RequestBody ExecuteTaskForceDTO body) {
        TaskForce taskForce = taskForceService.getTaskForceById(id);

        Job job = new Job();
        job.setName("test-job-001");

        return new ResponseEntity<>(job, HttpStatus.OK);
    }

}
