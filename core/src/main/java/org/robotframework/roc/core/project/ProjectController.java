package org.robotframework.roc.core.project;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface ProjectController {
    ResponseEntity<List<Project>> getProjects();

    ResponseEntity<String> createNewProject(@RequestBody Project project);

    ResponseEntity<Project> getProjectById(@PathVariable String id);

    ResponseEntity<Project> updateProjectById(@PathVariable String id, @RequestBody Project project);

    ResponseEntity<String> deleteProjectById(@PathVariable String id);
}
