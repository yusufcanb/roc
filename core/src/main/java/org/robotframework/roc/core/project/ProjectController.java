package org.robotframework.roc.core.project;

import org.robotframework.roc.core.project.Project;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface ProjectController {
    ResponseEntity<List<Project>> getProjects();

    ResponseEntity<Long> createNewProject(@RequestBody Project project);

    ResponseEntity<Project> getProjectById(@PathVariable Long id);

    ResponseEntity<Project> updateProjectById(@PathVariable Long id, @RequestBody Project project);

    ResponseEntity<Long> deleteProjectById(@PathVariable Long id);
}
