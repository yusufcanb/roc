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

package org.robotframework.roc.platform.project;

import org.robotframework.roc.core.controllers.ProjectController;
import org.robotframework.roc.core.models.Project;
import org.robotframework.roc.core.services.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class SimpleProjectController implements ProjectController {

    final ProjectService projectService;

    public SimpleProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @RequestMapping(value = "/project", method = RequestMethod.GET)
    @Override
    public ResponseEntity<List<Project>> getProjects() {
        return new ResponseEntity<>((List<Project>) projectService.getProjects(), HttpStatus.OK);
    }

    @RequestMapping(value = "/project", method = RequestMethod.POST)
    @Override
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
    @Override
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        Optional<Project> project = projectService.getProjectById(id);
        return project.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    @RequestMapping(value = "/project/{id}", method = RequestMethod.PUT)
    @Override
    public ResponseEntity<Project> updateProjectById(@PathVariable Long id, @RequestBody Project project) {
        Optional<Project> found = projectService.getProjectById(id);
        if (found.isPresent()) {
            return new ResponseEntity<>(projectService.updateProject(id, project), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/project/{id}", method = RequestMethod.DELETE)
    @Override
    public ResponseEntity<Long> deleteProjectById(@PathVariable Long id) {
        Optional<Project> found = projectService.getProjectById(id);
        if (found.isPresent()) {
            projectService.deleteProject(id);
            return new ResponseEntity<>(id, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
