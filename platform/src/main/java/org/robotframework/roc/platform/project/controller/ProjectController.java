package org.robotframework.roc.platform.project.controller;

import org.robotframework.roc.core.beans.ProjectFile;
import org.robotframework.roc.core.models.Project;
import org.robotframework.roc.platform.project.service.FileService;
import org.robotframework.roc.platform.project.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RestController
public class ProjectController {

    @Autowired
    ProjectService projectService;

    @Autowired
    FileService fileService;

    @RequestMapping(value = "/projects", method = RequestMethod.GET)
    public ResponseEntity<List<Project>> getProjects() {
        return new ResponseEntity<>(projectService.getAllProjects(), HttpStatus.OK);
    }

    @RequestMapping(value = "/projects", method = RequestMethod.POST)
    public ResponseEntity<Long> createNewProject(@RequestBody Project project) {
        try {
            Project saved = projectService.createNewProject(project);
            return new ResponseEntity<>(saved.getId(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(-1L, HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/projects/{id}", method = RequestMethod.GET)
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        Optional<Project> project = projectService.getProjectById(id);
        if (project.isPresent()) {
            return new ResponseEntity<>(project.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/projects/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Long> updateProjectById(@PathVariable Long id, @RequestBody Project project) throws Exception {
        throw new Exception("Not Implemented");
    }

    @RequestMapping(value = "/projects/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Long> deleteProjectById(@PathVariable Long id) throws Exception {
        throw new Exception("Not Implemented");
    }

    @RequestMapping(value = "/projects/{id}/files", method = RequestMethod.GET)
    public ResponseEntity<List<ProjectFile>> getProjectFilesById(@PathVariable("id") Long id) {
        Optional<Project> project = projectService.getProjectById(id);
        try {
            if (!project.isPresent()) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(fileService.getProjectFilesAsList(project.get()), HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/projects/{id}/files/{path}", method = RequestMethod.GET)
    public ResponseEntity<String> getProjectFilesByName(@PathVariable("id") Long id, @PathVariable("path") String filePath) {
        Optional<Project> project = projectService.getProjectById(id);
        if (!project.isPresent()) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        String path = new String(Base64.getDecoder().decode(filePath), StandardCharsets.UTF_8);
        try {
            return new ResponseEntity<>(fileService.getProjectFileContent(project.get(), path), HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

}
