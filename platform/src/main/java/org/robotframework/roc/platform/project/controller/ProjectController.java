package org.robotframework.roc.platform.project.controller;

import org.robotframework.roc.core.beans.ProjectFile;
import org.robotframework.roc.core.models.GlobalVariable;
import org.robotframework.roc.core.models.Project;
import org.robotframework.roc.core.services.FileService;
import org.robotframework.roc.core.services.GlobalVariableService;
import org.robotframework.roc.core.services.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.*;

@RestController
public class ProjectController {

    final
    ProjectService projectService;

    final
    FileService fileService;

    final
    GlobalVariableService globalVariableService;

    public ProjectController(ProjectService projectService, FileService fileService, GlobalVariableService globalVariableService) {
        this.projectService = projectService;
        this.fileService = fileService;
        this.globalVariableService = globalVariableService;
    }

    @RequestMapping(value = "/project", method = RequestMethod.GET)
    public ResponseEntity<List<Project>> getProjects() {
        return new ResponseEntity<>((List<Project>) projectService.getProjects(), HttpStatus.OK);
    }

    @RequestMapping(value = "/project", method = RequestMethod.POST)
    public ResponseEntity<Long> createNewProject(@RequestBody Project project) {
        try {
            Project saved = projectService.createProject(project);
            return new ResponseEntity<>(saved.getId(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(-1L, HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/project/{id}", method = RequestMethod.GET)
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        Optional<Project> project = projectService.getProjectById(id);
        if (project.isPresent()) {
            return new ResponseEntity<>(project.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/project/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Project> updateProjectById(@PathVariable Long id, @RequestBody Project project) {
        Optional<Project> found = projectService.getProjectById(id);
        if (found.isPresent()) {
            return new ResponseEntity<>(projectService.updateProject(id, project), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/project/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Long> deleteProjectById(@PathVariable Long id) {
        Optional<Project> found = projectService.getProjectById(id);
        if (found.isPresent()) {
            projectService.deleteProject(id);
            return new ResponseEntity<>(id, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/project/{id}/files", method = RequestMethod.GET)
    public ResponseEntity<List<ProjectFile>> getProjectFilesById(@PathVariable("id") Long id) {
        Optional<Project> project = projectService.getProjectById(id);
        try {
            if (project.isEmpty()) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            } else if (!project.get().getRepository().getIsInitialized()) {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(fileService.getProjectFiles(project.get()), HttpStatus.OK);
            }
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/project/{id}/files/{path}", method = RequestMethod.GET)
    public ResponseEntity<String> getProjectFilesByName(@PathVariable("id") Long id, @PathVariable("path") String filePath) {
        Optional<Project> project = projectService.getProjectById(id);
        if (!project.isPresent()) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } else if (!project.get().getRepository().getIsInitialized()) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        try {
            String path = new String(Base64.getDecoder().decode(filePath), StandardCharsets.UTF_8);
            return new ResponseEntity<>(fileService.getProjectFileContent(project.get(), path), HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/project/{id}/globals", method = RequestMethod.GET)
    public ResponseEntity<Collection<GlobalVariable>> getProjectGlobalVariables(@PathVariable("id") Long id) {
        Optional<Project> project = projectService.getProjectById(id);
        if (project.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } else if (!project.get().getRepository().getIsInitialized()) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(globalVariableService.getGlobalVariablesByProject(project.get()), HttpStatus.OK);
        }
    }

}
