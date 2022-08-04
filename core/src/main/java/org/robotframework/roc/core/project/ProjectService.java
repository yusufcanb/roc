package org.robotframework.roc.core.project;

import org.robotframework.roc.core.CRUDService;

import java.util.Collection;
import java.util.Optional;

public interface ProjectService extends CRUDService<String> {
    Project createProject(Project project);

    Project updateProject(String id, Project project);

    void deleteProject(String id);

    Collection<Project> getProjects();

    Optional<Project> getProjectById(String id);
}
