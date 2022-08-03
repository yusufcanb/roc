package org.robotframework.roc.core.project;

import org.robotframework.roc.core.CRUDService;

import java.util.Collection;
import java.util.Optional;

public interface ProjectService extends CRUDService<Long> {
    Project createProject(Project project);

    Project updateProject(Long id, Project project);

    void deleteProject(Long id);

    Collection<Project> getProjects();

    Optional<Project> getProjectById(Long id);
}
