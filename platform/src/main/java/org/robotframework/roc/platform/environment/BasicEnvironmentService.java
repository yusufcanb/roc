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

package org.robotframework.roc.platform.environment;

import io.minio.errors.MinioException;
import org.robotframework.roc.core.dto.environment.EnvironmentCreateDto;
import org.robotframework.roc.core.dto.environment.EnvironmentUpdateDto;
import org.robotframework.roc.core.exceptions.ProjectNotFoundException;
import org.robotframework.roc.core.models.Environment;
import org.robotframework.roc.core.models.Project;
import org.robotframework.roc.core.services.EnvironmentService;
import org.robotframework.roc.platform.project.ProjectRepository;
import org.robotframework.roc.platform.s3.ObjectStorageService;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

@Service
public class BasicEnvironmentService implements EnvironmentService {

    final
    ProjectRepository projectRepository;

    final
    EnvironmentRepository environmentRepository;

    final
    ObjectStorageService oss;


    public BasicEnvironmentService(EnvironmentRepository environmentRepository, ProjectRepository projectRepository, ObjectStorageService oss) {
        this.environmentRepository = environmentRepository;
        this.projectRepository = projectRepository;
        this.oss = oss;
    }

    @Override
    public boolean isExists(Long aLong) {
        return false;
    }

    @Override
    public List<Environment> getEnvironments(Long projectId) {
        return environmentRepository.findAll();
    }

    @Override
    public Optional<Environment> getEnvironmentById(Long id) {
        return environmentRepository.findById(id);
    }

    @Override
    public Environment createEnvironment(Environment environment) {
        environmentRepository.save(environment);
        return environment;
    }

    @Override
    public Environment createEnvironment(Long projectId, EnvironmentCreateDto dto) throws ProjectNotFoundException, MinioException {

        Optional<Project> optionalProject = projectRepository.findById(projectId);

        if (optionalProject.isEmpty()) {
            throw new ProjectNotFoundException();
        }

        Environment environment = new Environment();
        environment.setName(dto.getName());
        environment.setDescription(dto.getDescription());
        environment.setProject(optionalProject.get());
        environment = environmentRepository.save(environment);
        if (!dto.getCode().isEmpty()) {
            InputStream stream = new ByteArrayInputStream(dto.getCode().getBytes(StandardCharsets.UTF_8));
            String path = String.join("/", "projects", environment.getProjectId().toString(), "environment", environment.getId().toString(), "variables.yaml");
            oss.upload("roc", path, stream, "application/yaml");
        }
        return environment;
    }

    @Override
    public Environment updateEnvironment(Long id, EnvironmentUpdateDto dto) {
        return null;
    }

    @Override
    public Environment updateEnvironment(Environment environment, EnvironmentUpdateDto dto) throws MinioException {

        environment.setName(dto.getName());
        environment.setDescription(dto.getDescription());

        if (!dto.getCode().isEmpty()) {
            InputStream stream = new ByteArrayInputStream(dto.getCode().getBytes(StandardCharsets.UTF_8));
            String path = String.join("/", "environment", environment.getId().toString(), "variables.yaml");
            oss.upload("default-project", path, stream, "application/yaml");
        }
        return environmentRepository.save(environment);
    }

    @Override
    public void deleteEnvironment(Long id) {
        environmentRepository.deleteById(id);
    }
}
