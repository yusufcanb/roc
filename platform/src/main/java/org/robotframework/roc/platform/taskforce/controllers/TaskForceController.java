package org.robotframework.roc.platform.taskforce.controllers;

import org.robotframework.roc.core.models.Job;
import org.robotframework.roc.platform.taskforce.dto.ExecuteTaskForceDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.ArrayList;
import java.util.List;

@Controller
public class TaskForceController {

    private final SimpMessagingTemplate messagingTemplate;

    public TaskForceController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @RequestMapping(value = "/task-force", method = RequestMethod.GET)
    public ResponseEntity<List<Object>> getTaskForces() {
        messagingTemplate.convertAndSend(String.format("/queue/events.%s", "1ef455f"), "{\"hello\": \"world\"}");
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
    }

    @RequestMapping(value = "/task-force/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> getTaskForceById() {
        messagingTemplate.convertAndSend(String.format("/queue/events.%s", "1ef455f"), "{\"hello\": \"world\"}");
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
    }

    @RequestMapping(value = "/task-force/{id}/execute", method = RequestMethod.POST)
    public ResponseEntity<Object> executeTaskForce(@RequestBody ExecuteTaskForceDTO body) {
        Job job = new Job();
        job.setName("test-job-001");

        messagingTemplate.convertAndSend(String.format("/queue/events.%s", body.getAgentId()), "[]");
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
    }

}
