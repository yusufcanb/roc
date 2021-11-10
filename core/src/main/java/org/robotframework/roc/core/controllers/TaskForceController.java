package org.robotframework.roc.core.controllers;

import org.robotframework.roc.core.dto.taskforce.ExecuteTaskForceDTO;
import org.robotframework.roc.core.models.Job;
import org.robotframework.roc.core.models.TaskForce;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface TaskForceController {

    ResponseEntity<List<TaskForce>> getTaskForces(@RequestParam Long projectId);

    ResponseEntity<TaskForce> createTaskForce(@RequestParam Long projectId, @RequestBody TaskForce taskForce);

    ResponseEntity<TaskForce> getTaskForceById(@PathVariable Long id);

    ResponseEntity<FileSystemResource> downloadTaskForcePackage(@PathVariable Long id);

    ResponseEntity<Job> executeTaskForce(@PathVariable Long id, @RequestBody ExecuteTaskForceDTO body);

    ResponseEntity<TaskForce> updateTaskForceById(@PathVariable Long id, @RequestBody Object body);

    ResponseEntity<Boolean> deleteTaskForceById(@PathVariable Long id, @RequestBody Object body);


}
