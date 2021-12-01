package org.robotframework.roc.platform.project.service;

import org.robotframework.roc.core.models.Project;
import org.robotframework.roc.core.services.GlobalVariableService;
import org.robotframework.roc.core.services.ProjectService;
import org.robotframework.roc.platform.project.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Collection;
import java.util.Date;
import java.util.Optional;

@Service
public class ProjectServiceImpl implements ProjectService {

    final ProjectRepository projectRepository;

    final GlobalVariableService globalVariableService;


    public ProjectServiceImpl(ProjectRepository projectRepository,
                              GlobalVariableService globalVariableService) {
        this.projectRepository = projectRepository;
        this.globalVariableService = globalVariableService;
    }

    @Override
    public Project createProject(Project project) {
        project.setCreatedAt(Date.from(Instant.now()));
        return projectRepository.save(project);
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
