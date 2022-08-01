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

import org.robotframework.roc.core.models.Project;
import org.robotframework.roc.core.services.ProjectService;
import org.robotframework.roc.platform.repository.ProjectRepository;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Collection;
import java.util.Date;
import java.util.Optional;

@Service
public class ProjectServiceImpl implements ProjectService {

    final ProjectRepository projectRepository;
    final RedisTemplate<String, Object> redisTemplate;


    public ProjectServiceImpl(ProjectRepository projectRepository, RedisTemplate<String, Object> redisTemplate) {
        this.projectRepository = projectRepository;
        this.redisTemplate = redisTemplate;
    }

    @Override
    public Project createProject(Project project) {
        project.setCreatedAt(Date.from(Instant.now()));
        Project saved = projectRepository.save(project);

        redisTemplate.convertAndSend("project.created", saved);

        return saved;
    }

    @Override
    public Project updateProject(Long id, Project product) {
        return null;
    }

    @Override
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    @Override
    public Collection<Project> getProjects() {
        return this.projectRepository.findAll();
    }

    @Override
    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }

    @Override
    public boolean isExists(Long id) {
        return projectRepository.existsById(id);
    }


}
