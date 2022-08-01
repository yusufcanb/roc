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

package org.robotframework.roc.platform.taskforce;

import lombok.extern.slf4j.Slf4j;
import org.robotframework.roc.core.controllers.TaskForceController;
import org.robotframework.roc.core.dto.taskforce.ExecuteTaskForceDTO;
import org.robotframework.roc.core.dto.taskforce.TaskForceUpdateDto;
import org.robotframework.roc.core.exceptions.ProjectNotFoundException;
import org.robotframework.roc.core.models.Job;
import org.robotframework.roc.core.models.TaskForce;
import org.robotframework.roc.core.services.JobService;
import org.robotframework.roc.core.services.TaskForceService;
import org.robotframework.roc.platform.s3.ObjectStorageService;
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
public class SimpleTaskForceController implements TaskForceController {

    private final TaskForceService taskForceService;
    private final JobService jobService;

    public SimpleTaskForceController(TaskForceService taskForceService, JobService jobService, ObjectStorageService objectStorageService) {
        this.taskForceService = taskForceService;
        this.jobService = jobService;
    }

    @RequestMapping(value = "/task-force", method = RequestMethod.GET)
    @Override
    public ResponseEntity<List<TaskForce>> getTaskForces(@RequestParam Long projectId) {
        return new ResponseEntity<>(taskForceService.getTaskForcesByProject(projectId), HttpStatus.OK);
    }

    @RequestMapping(value = "/task-force", method = RequestMethod.POST)
    @Override
    public ResponseEntity<TaskForce> createTaskForce(@RequestParam Long projectId, @RequestBody TaskForce taskForce) {
        try {
            TaskForce tf = taskForceService.createTaskForce(projectId, taskForce);
            return new ResponseEntity<>(tf, HttpStatus.OK);
        } catch (ProjectNotFoundException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Project does not exists", ex);
        }
    }

    @RequestMapping(value = "/task-force/{id}", method = RequestMethod.GET)
    @Override
    public ResponseEntity<TaskForce> getTaskForceById(@PathVariable Long id) {
        Optional<TaskForce> taskForce = taskForceService.getTaskForceById(id);
        if (taskForce.isPresent()) {
            return new ResponseEntity<>(taskForce.get(), HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Task force does not exists", null);
        }
    }

    @RequestMapping(value = "/task-force/{id}/package", method = RequestMethod.POST)
    public ResponseEntity<TaskForce> uploadTaskForcePackage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        Optional<TaskForce> taskForceOptional = taskForceService.getTaskForceById(id);
        if (taskForceOptional.isPresent()) {
            try {
                taskForceService.uploadTaskForcePackage(taskForceOptional.get(), file);
                return new ResponseEntity<>(taskForceOptional.get(), HttpStatus.OK);
            } catch (Exception e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Object storage connection failed.", e);
            }
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Task force does not exists", null);
        }
    }

    @RequestMapping(value = "/task-force/{id}/jobs", method = RequestMethod.GET)
    public ResponseEntity<List<Job>> getJobsByTaskForce(@PathVariable Long id) {
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
    public ResponseEntity<TaskForce> updateTaskForceById(@PathVariable Long id, @RequestBody TaskForceUpdateDto dto) {
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
    public ResponseEntity<Boolean> deleteTaskForceById(@PathVariable Long id) {
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
    public ResponseEntity<Job> executeTaskForce(@PathVariable Long id, @RequestBody ExecuteTaskForceDTO body) {
        Optional<TaskForce> taskForce = taskForceService.getTaskForceById(id);
        if (taskForce.isPresent()) {
            Job job = taskForceService.executeTaskForce(taskForce.get(), body.getAgentId(), body.getEnvironmentId());
            return new ResponseEntity<>(job, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

}
