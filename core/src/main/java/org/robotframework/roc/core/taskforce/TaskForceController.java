package org.robotframework.roc.core.taskforce;

import org.robotframework.roc.core.job.Job;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface TaskForceController {

    ResponseEntity<List<TaskForce>> getTaskForces(@RequestParam Long projectId);

    ResponseEntity<TaskForce> createTaskForce(@RequestParam Long projectId, @RequestBody TaskForce taskForce);

    ResponseEntity<TaskForce> getTaskForceById(@PathVariable String id);

//    ResponseEntity<FileSystemResource> uploadTaskForcePackage(@PathVariable Long id, @RequestParam("file") MultipartFile file);

    ResponseEntity<Job> executeTaskForce(@PathVariable String id, @RequestBody ExecuteTaskForceDTO body);

    ResponseEntity<TaskForce> updateTaskForceById(@PathVariable String id, @RequestBody TaskForceUpdateDto body);

    ResponseEntity<Boolean> deleteTaskForceById(@PathVariable String id);

}
