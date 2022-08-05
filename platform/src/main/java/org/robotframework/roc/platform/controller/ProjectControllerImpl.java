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

package org.robotframework.roc.platform.controller;

import lombok.extern.slf4j.Slf4j;
import org.robotframework.roc.core.project.Project;
import org.robotframework.roc.core.project.ProjectController;
import org.robotframework.roc.core.project.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@Slf4j
public class ProjectControllerImpl extends BaseController implements ProjectController {

    final ProjectService projectService;

    public ProjectControllerImpl(ProjectService projectService) {
        this.projectService = projectService;
    }

    @RequestMapping(value = "/project", method = RequestMethod.GET)
    @Override
    public ResponseEntity<List<Project>> getProjects() {
        return new ResponseEntity<>((List<Project>) projectService.getProjects(), HttpStatus.OK);
    }

    @RequestMapping(value = "/project", method = RequestMethod.POST)
    @Override
    public ResponseEntity<String> createNewProject(@RequestBody @Valid Project project) {
        try {
            Project saved = projectService.createProject(project);
            return new ResponseEntity<>(saved.getId(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }


    @RequestMapping(value = "/project/{id}", method = RequestMethod.GET)
    @Override
    public ResponseEntity<Project> getProjectById(@PathVariable String id) {
        Optional<Project> project = projectService.getProjectById(id);
        return project.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    @RequestMapping(value = "/project/{id}", method = RequestMethod.PUT)
    @Override
    public ResponseEntity<Project> updateProjectById(@PathVariable String id, @RequestBody Project project) {
        Optional<Project> found = projectService.getProjectById(id);
        if (found.isPresent()) {
            return new ResponseEntity<>(projectService.updateProject(id, project), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/project/{id}", method = RequestMethod.DELETE)
    @Override
    public ResponseEntity<String> deleteProjectById(@PathVariable String id) {
        Optional<Project> found = projectService.getProjectById(id);
        if (found.isPresent()) {
            projectService.deleteProject(id);
            return new ResponseEntity<>(id, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
