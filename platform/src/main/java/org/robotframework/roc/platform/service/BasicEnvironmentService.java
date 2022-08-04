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
import org.robotframework.roc.core.environment.EnvironmentCreateDto;
import org.robotframework.roc.core.environment.EnvironmentUpdateDto;
import org.robotframework.roc.core.project.ProjectNotFoundException;
import org.robotframework.roc.core.environment.Environment;
import org.robotframework.roc.core.project.Project;
import org.robotframework.roc.core.environment.EnvironmentService;
import org.robotframework.roc.platform.repository.ProjectRepository;
import org.robotframework.roc.platform.repository.EnvironmentRepository;
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

    private void saveStringAsVariableFile(Environment env, String yaml) throws MinioException {
        InputStream stream = new ByteArrayInputStream(yaml.getBytes(StandardCharsets.UTF_8));
        String path = String.join("/", "environment", env.getId().toString(), "variables.yaml");
        oss.upload("default", path, stream, "application/yaml");
    }

    @Override
    public boolean isExists(String environmentId) {
        return false;
    }

    @Override
    public List<Environment> getEnvironments(String projectId) {
        return environmentRepository.findAll();
    }

    @Override
    public Optional<Environment> getEnvironmentById(String environmentId) {
        return environmentRepository.findById(environmentId);
    }

    @Override
    public Environment createEnvironment(Environment environment) {
        environmentRepository.save(environment);
        return environment;
    }

    @Override
    public Environment createEnvironment(String projectId, EnvironmentCreateDto dto) throws ProjectNotFoundException, MinioException {

        Optional<Project> optionalProject = projectRepository.findById(projectId);

        if (optionalProject.isEmpty()) {
            throw new ProjectNotFoundException();
        }

        Environment environment = new Environment();
        environment.setProjectId(projectId);
        environment.setName(dto.getName());
        environment.setTags(dto.getTags());

        environment = environmentRepository.save(environment);

        if (!dto.getYaml().isEmpty()) {
            this.saveStringAsVariableFile(environment, dto.getYaml());
        }

        return environment;
    }

    @Override
    public Environment updateEnvironment(String id, EnvironmentUpdateDto dto) {
        return null;
    }

    @Override
    public Environment updateEnvironment(Environment environment, EnvironmentUpdateDto dto) throws MinioException {

        environment.setName(dto.getName());
        environment.setTags(dto.getTags());

        if (!dto.getYaml().isEmpty()) {
            this.saveStringAsVariableFile(environment, dto.getYaml());
        }
        return environmentRepository.save(environment);
    }

    @Override
    public void deleteEnvironment(String environmentId) {
        environmentRepository.deleteById(environmentId);
    }
}
