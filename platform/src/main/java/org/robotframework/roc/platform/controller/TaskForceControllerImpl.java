/*
 *   Copyright (c) 2021-2022 Yusuf Can Bayrak <yusufcanbayrak@gmail.com>
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 *   Contributors:
 *   Yusuf Can Bayrak - initial implementation and documentation.
 *
 */

package org.robotframework.roc.platform.controller;

import io.minio.errors.MinioException;
import lombok.extern.slf4j.Slf4j;
import org.robotframework.roc.core.job.Job;
import org.robotframework.roc.core.job.JobService;
import org.robotframework.roc.core.project.ProjectNotFoundException;
import org.robotframework.roc.core.taskforce.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Controller
@Slf4j
public class TaskForceControllerImpl extends BaseController implements TaskForceController {

    private final TaskForceService taskForceService;
    private final JobService jobService;

    public TaskForceControllerImpl(TaskForceService taskForceService, JobService jobService) {
        this.taskForceService = taskForceService;
        this.jobService = jobService;
    }

    @RequestMapping(value = "/task-force", method = RequestMethod.GET)
    @Override
    public ResponseEntity<List<TaskForce>> getTaskForces(@RequestParam String projectId) {
        return new ResponseEntity<>(taskForceService.getTaskForcesByProject(projectId), HttpStatus.OK);
    }

    @RequestMapping(value = "/task-force", method = RequestMethod.POST)
    @Override
    public ResponseEntity<TaskForce> createTaskForce(@RequestParam String projectId, @RequestBody TaskForceCreateDto taskForce) {
        try {
            TaskForce tf = taskForceService.createTaskForce(projectId, taskForce);
            return new ResponseEntity<>(tf, HttpStatus.OK);
        } catch (ProjectNotFoundException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Project does not exists", ex);
        }
    }

    @RequestMapping(value = "/task-force/{id}", method = RequestMethod.GET)
    @Override
    public ResponseEntity<TaskForce> getTaskForceById(@PathVariable String id) {
        Optional<TaskForce> taskForce = taskForceService.getTaskForceById(id);
        if (taskForce.isPresent()) {
            return new ResponseEntity<>(taskForce.get(), HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Task force does not exists", null);
        }
    }

    @RequestMapping(value = "/task-force/{id}/package", method = RequestMethod.POST)
    public ResponseEntity<?> uploadTaskForcePackage(@PathVariable String id, @RequestParam("file") MultipartFile file) {
        Optional<TaskForce> taskForceOptional = taskForceService.getTaskForceById(id);
        if (taskForceOptional.isPresent()) {
            try {
                taskForceService.uploadTaskForcePackage(taskForceOptional.get(), file);
                return new ResponseEntity<>(true, HttpStatus.OK);
            } catch (MinioException ex1) {
                log.error(ex1.getMessage());
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Object storage connection failed.", ex1);
            } catch (Exception e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Object storage connection failed.", e);
            }
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Task force does not exists", null);
        }
    }

    @RequestMapping(value = "/task-force/{id}/jobs", method = RequestMethod.GET)
    public ResponseEntity<List<Job>> getJobsByTaskForce(@PathVariable String id) {
        Optional<TaskForce> taskForce = taskForceService.getTaskForceById(id);
        if (taskForce.isPresent()) {
            List<Job> jobs = jobService.getJobsByTaskForce(taskForce.get().getId());
            return new ResponseEntity<>(jobs, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/task-force/{id}", method = RequestMethod.PUT)
    @Override
    public ResponseEntity<TaskForce> updateTaskForceById(@PathVariable String id, @RequestBody TaskForceUpdateDto dto) {
        Optional<TaskForce> taskForce = taskForceService.getTaskForceById(id);
        if (taskForce.isPresent()) {
            taskForceService.updateTaskForce(taskForce.get(), dto);
            return new ResponseEntity<>(taskForce.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/task-force/{id}", method = RequestMethod.DELETE)
    @Override
    public ResponseEntity<Boolean> deleteTaskForceById(@PathVariable String id) {
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
    public ResponseEntity<Job> executeTaskForce(@PathVariable String id, @RequestBody ExecuteTaskForceDTO body) {
        Optional<TaskForce> taskForce = taskForceService.getTaskForceById(id);
        if (taskForce.isPresent()) {
            Job job = taskForceService.executeTaskForce(taskForce.get(), body.getEnvironmentId(), body.getAgentId());
            return new ResponseEntity<>(job, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

}