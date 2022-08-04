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

package org.robotframework.roc.platform.service;

import io.minio.errors.MinioException;
import org.robotframework.roc.core.agent.Agent;
import org.robotframework.roc.core.environment.Environment;
import org.robotframework.roc.core.job.Job;
import org.robotframework.roc.core.project.Project;
import org.robotframework.roc.core.project.ProjectNotFoundException;
import org.robotframework.roc.core.taskforce.TaskForce;
import org.robotframework.roc.core.taskforce.TaskForceCreateDto;
import org.robotframework.roc.core.taskforce.TaskForceService;
import org.robotframework.roc.core.taskforce.TaskForceUpdateDto;
import org.robotframework.roc.platform.repository.AgentRepository;
import org.robotframework.roc.platform.repository.EnvironmentRepository;
import org.robotframework.roc.platform.repository.ProjectRepository;
import org.robotframework.roc.platform.repository.TaskForceRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.sql.Date;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class TaskForceServiceImpl implements TaskForceService {

    private final EnvironmentRepository environmentRepository;
    private final AgentRepository agentRepository;
    private final TaskForceRepository taskForceRepository;
    private final ObjectStorageService oss;

    private final ProjectRepository projectRepository;

    public TaskForceServiceImpl(ProjectRepository projectRepository, TaskForceRepository taskForceRepository, AgentRepository agentRepository, EnvironmentRepository environmentRepository, ObjectStorageService oss) {
        this.taskForceRepository = taskForceRepository;
        this.projectRepository = projectRepository;
        this.agentRepository = agentRepository;
        this.environmentRepository = environmentRepository;
        this.oss = oss;
    }

    @Override
    public List<TaskForce> getTaskForcesByProject(String projectId) {
        return taskForceRepository.findAll();
    }

    @Override
    public Optional<TaskForce> getTaskForceById(String taskForceId) {
        return taskForceRepository.findById(taskForceId);
    }

    @Override
    public TaskForce updateTaskForce(TaskForce taskForce) {
        return taskForceRepository.save(taskForce);
    }

    @Override
    public TaskForce updateTaskForce(String id, TaskForceUpdateDto dto) {
        TaskForce tf = taskForceRepository.getOne(id);
        tf.setName(dto.getName());
        return taskForceRepository.save(tf);
    }

    @Override
    public TaskForce updateTaskForce(TaskForce taskForce, TaskForceUpdateDto dto) {
        taskForce.setName(dto.getName() == null ? taskForce.getName() : dto.getName());
        return taskForceRepository.save(taskForce);
    }

    @Override
    public void uploadTaskForcePackage(TaskForce taskForce, MultipartFile file) throws IOException, MinioException {
        String s3Path = String.format("/task-force/%s/%s", taskForce.getId(), file.getOriginalFilename());
        oss.upload(s3Path, file.getInputStream(), file.getContentType());
    }

    @Override
    public Job executeTaskForce(TaskForce taskForce, String environmentId, String agentId) {
        Optional<Environment> optionalEnvironment = environmentRepository.findById(environmentId);
        Optional<Agent> optionalAgent = agentRepository.findById(agentId);

        for (Optional optional : new Optional[]{optionalAgent, optionalEnvironment}) {
            if (optional.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request", null);
            }
        }

        throw new RuntimeException("Not implemented!");
    }

    @Override
    public TaskForce createTaskForce(String projectId, TaskForceCreateDto dto) throws ProjectNotFoundException {
        Optional<Project> project = projectRepository.findById(projectId);
        if (project.isEmpty()) {
            throw new ProjectNotFoundException();
        }
        TaskForce tf = new TaskForce();
        tf.setProjectId(projectId);
        tf.setName(dto.getName());
        tf.setDescription(dto.getDescription());
        tf.setPkg(null);
        tf.setCreatedAt(Date.from(Instant.now()));
        tf.setTags(dto.getTags());

        return taskForceRepository.save(tf);
    }

    @Override
    public void deleteTaskForce(TaskForce taskForce) {
        taskForceRepository.delete(taskForce);
    }

    @Override
    public void deleteTaskForceById(String id) {
        taskForceRepository.deleteById(id);
    }
}
