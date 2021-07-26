package org.robotframework.roc.core.services;

import org.robotframework.roc.core.models.Project;

import java.util.Collection;
import java.util.Optional;

public interface ProjectService extends CRUDService<Long> {
    Project createProject(Project project);

    Project updateProject(Long id, Project project);

    void deleteProject(Long id);

    Collection<Project> getProjects();

    Optional<Project> getProjectById(Long id);
}
