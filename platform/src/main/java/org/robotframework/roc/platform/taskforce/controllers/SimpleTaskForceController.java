package org.robotframework.roc.platform.taskforce.controllers;

import org.robotframework.roc.core.controllers.TaskForceController;
import org.robotframework.roc.core.models.Job;
import org.robotframework.roc.core.models.TaskForce;
import org.robotframework.roc.core.services.JobService;
import org.robotframework.roc.core.services.TaskForceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Controller
public class SimpleTaskForceController implements TaskForceController {

    private final TaskForceService taskForceService;
    private final JobService jobService;

    public SimpleTaskForceController(TaskForceService taskForceService, JobService jobService) {
        this.taskForceService = taskForceService;
        this.jobService = jobService;
    }

    @RequestMapping(value = "/task-force", method = RequestMethod.GET)
    @Override
    public ResponseEntity<List<Object>> getTaskForces() {
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
    }

    @RequestMapping(value = "/task-force/{id}", method = RequestMethod.GET)
    @Override
    public ResponseEntity<TaskForce> getTaskForceById(@PathVariable Long id) {
        Optional<TaskForce> taskForce = taskForceService.getTaskForceById(id);
        if (taskForce.isPresent()) {
            return new ResponseEntity<>(taskForce.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/task-force/{id}", method = RequestMethod.PUT)
    @Override
    public ResponseEntity<TaskForce> updateTaskForceById(@PathVariable Long id, @RequestBody Object body) {
        Optional<TaskForce> taskForce = taskForceService.getTaskForceById(id);
        if (taskForce.isPresent()) {
            taskForceService.updateTaskForce(id, (TaskForce) body);
            return new ResponseEntity<>(taskForce.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/task-force/{id}", method = RequestMethod.DELETE)
    @Override
    public ResponseEntity<Boolean> deleteTaskForceById(@PathVariable Long id, @RequestBody Object body) {
        Optional<TaskForce> taskForce = taskForceService.getTaskForceById(id);
        if (taskForce.isPresent()) {
            taskForceService.deleteTaskForceById(id);
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/task-force/{id}/execute", method = RequestMethod.POST)
    @Override
    public ResponseEntity<Job> executeTaskForce(@PathVariable Long id, @RequestBody Object body) {
        Optional<TaskForce> taskForce = taskForceService.getTaskForceById(id);
        if (taskForce.isPresent()) {
            return new ResponseEntity<>(null, HttpStatus.NOT_IMPLEMENTED);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

}
