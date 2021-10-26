package org.robotframework.roc.core.controllers;

import org.robotframework.roc.core.beans.ProjectFile;
import org.robotframework.roc.core.models.GlobalVariable;
import org.robotframework.roc.core.models.Project;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Collection;
import java.util.List;

public interface ProjectController {
    ResponseEntity<List<Project>> getProjects();

    ResponseEntity<Long> createNewProject(@RequestBody Project project);

    ResponseEntity<Project> getProjectById(@PathVariable Long id);

    ResponseEntity<Project> updateProjectById(@PathVariable Long id, @RequestBody Project project);

    ResponseEntity<Long> deleteProjectById(@PathVariable Long id);

    ResponseEntity<List<ProjectFile>> getProjectFilesById(@PathVariable Long id);

    ResponseEntity<String> getProjectFilesByName(@PathVariable Long id, @PathVariable("path") String filePath);

    ResponseEntity<Collection<GlobalVariable>> getProjectGlobalVariables(@PathVariable Long id);
}
