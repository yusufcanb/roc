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

import io.minio.errors.MinioException;
import lombok.extern.slf4j.Slf4j;
import org.robotframework.roc.core.environment.*;
import org.robotframework.roc.core.project.ProjectNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@Slf4j
public class EnvironmentControllerImpl extends BaseController implements EnvironmentController {

    final EnvironmentService environmentService;

    EnvironmentControllerImpl(EnvironmentService environmentService) {
        this.environmentService = environmentService;
    }

    @RequestMapping(value = "/environment", method = RequestMethod.POST)
    @Override
    public ResponseEntity<Environment> createNewEnvironment(@RequestParam String projectId, @RequestBody @Valid EnvironmentCreateDto dto) {
        Environment created;
        try {
            created = environmentService.createEnvironment(projectId, dto);
            return new ResponseEntity<>(created, HttpStatus.CREATED);
        } catch (ProjectNotFoundException ex1) {
            log.error("Project does not exists");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Project does not exists", ex1);
        } catch (MinioException ex2) {
            log.error("Minio connection failed");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Minio connection failed", ex2);
        } catch (Exception ex3) {
            log.error("Something went wrong");
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong", ex3);
        }
    }

    @RequestMapping(value = "/environment", method = RequestMethod.GET)
    @Override
    public ResponseEntity<List<Environment>> getEnvironments(@RequestParam String projectId) {
        return new ResponseEntity<>(environmentService.getEnvironments(projectId), HttpStatus.OK);
    }

    @RequestMapping(value = "/environment/{id}", method = RequestMethod.GET)
    @Override
    public ResponseEntity<Environment> getEnvironmentById(@PathVariable String id) {
        Optional<Environment> env = environmentService.getEnvironmentById(id);
        return env.map(environment -> new ResponseEntity<>(environment, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    @RequestMapping(value = "/environment/{id}", method = RequestMethod.PUT)
    @Override
    public ResponseEntity<Environment> updateEnvironmentById(@PathVariable String id, @RequestBody @Valid EnvironmentUpdateDto dto) {
        Optional<Environment> env = environmentService.getEnvironmentById(id);
        if (env.isPresent()) {
            try {
                Environment environment = environmentService.updateEnvironment(env.get(), dto);
                return new ResponseEntity<>(environment, HttpStatus.OK);
            } catch (Exception e) {
                log.error(e.getClass().getTypeName());
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/environment/{id}", method = RequestMethod.DELETE)
    @Override
    public ResponseEntity<Environment> deleteEnvironmentById(@PathVariable String id) {
        Optional<Environment> env = environmentService.getEnvironmentById(id);
        if (env.isPresent()) {
            environmentService.deleteEnvironment(id);
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

}
