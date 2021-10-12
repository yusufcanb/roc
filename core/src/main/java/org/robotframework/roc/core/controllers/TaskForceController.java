package org.robotframework.roc.core.controllers;

import org.robotframework.roc.core.models.Job;
import org.robotframework.roc.core.models.TaskForce;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface TaskForceController {

    ResponseEntity<List<Object>> getTaskForces();

    ResponseEntity<TaskForce> getTaskForceById(@PathVariable Long id);

    ResponseEntity<Job> executeTaskForce(@PathVariable Long id, @RequestBody Object body);

    ResponseEntity<TaskForce> updateTaskForceById(@PathVariable Long id, @RequestBody Object body);

    ResponseEntity<Boolean> deleteTaskForceById(@PathVariable Long id, @RequestBody Object body);
}
