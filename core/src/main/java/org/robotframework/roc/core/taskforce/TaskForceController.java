package org.robotframework.roc.core.taskforce;

import org.robotframework.roc.core.job.Job;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface TaskForceController {

    ResponseEntity<List<TaskForce>> getTaskForces(@RequestParam String projectId);

    ResponseEntity<TaskForce> createTaskForce(@RequestParam String projectId, @RequestBody TaskForceCreateDto taskForce);

    ResponseEntity<TaskForce> getTaskForceById(@PathVariable String id);

//    ResponseEntity<?> uploadTaskForcePackage(@PathVariable Long id, @RequestParam("file") MultipartFile file);

    ResponseEntity<Job> executeTaskForce(@PathVariable String id, @RequestBody ExecuteTaskForceDTO body);

    ResponseEntity<TaskForce> updateTaskForceById(@PathVariable String id, @RequestBody TaskForceUpdateDto body);

    ResponseEntity<Boolean> deleteTaskForceById(@PathVariable String id);

}
