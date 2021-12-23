package org.robotframework.roc.platform.environment.controllers;

import io.minio.errors.MinioException;
import lombok.extern.slf4j.Slf4j;
import org.robotframework.roc.core.controllers.EnvironmentController;
import org.robotframework.roc.core.dto.environment.EnvironmentCreateDto;
import org.robotframework.roc.core.dto.environment.EnvironmentUpdateDto;
import org.robotframework.roc.core.exceptions.ProjectNotFoundException;
import org.robotframework.roc.core.models.Environment;
import org.robotframework.roc.core.services.EnvironmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@Slf4j
public class SimpleEnvironmentController implements EnvironmentController {

    final EnvironmentService environmentService;

    SimpleEnvironmentController(EnvironmentService environmentService) {
        this.environmentService = environmentService;
    }

    @RequestMapping(value = "/environment", method = RequestMethod.POST)
    @Override
    public ResponseEntity<Environment> createNewEnvironment(@RequestParam Long projectId, @RequestBody EnvironmentCreateDto dto) {
        Environment created = null;
        try {
            created = environmentService.createEnvironment(projectId, dto);
            return new ResponseEntity<>(created, HttpStatus.CREATED);
        } catch (ProjectNotFoundException ex1) {
            log.error(ex1.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Project does not exists", ex1);
        } catch (MinioException ex2) {
            log.error(ex2.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Minio connection failed", ex2);
        } catch (Exception ex3) {
            log.error(ex3.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong", ex3);
        }
    }

    @RequestMapping(value = "/environment", method = RequestMethod.GET)
    @Override
    public ResponseEntity<List<Environment>> getEnvironments(@RequestParam Long projectId) {
        return new ResponseEntity<>(environmentService.getEnvironments(projectId), HttpStatus.OK);
    }

    @RequestMapping(value = "/environment/{id}", method = RequestMethod.GET)
    @Override
    public ResponseEntity<Environment> getEnvironmentById(@PathVariable Long id) {
        Optional<Environment> env = environmentService.getEnvironmentById(id);
        if (env.isPresent()) {
            return new ResponseEntity<>(env.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/environment/{id}", method = RequestMethod.PUT)
    @Override
    public ResponseEntity<Environment> updateEnvironmentById(@PathVariable Long id, @RequestBody EnvironmentUpdateDto dto) {
        Optional<Environment> env = environmentService.getEnvironmentById(id);
        if (env.isPresent()) {
            try {
                Environment environment = environmentService.updateEnvironment(env.get(), dto);
                return new ResponseEntity<>(environment, HttpStatus.OK);
            } catch (Exception e) {
                log.error(e.getMessage());
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/environment/{id}", method = RequestMethod.DELETE)
    @Override
    public ResponseEntity<Environment> deleteEnvironmentById(@PathVariable Long id) {
        Optional<Environment> env = environmentService.getEnvironmentById(id);
        if (env.isPresent()) {
            environmentService.deleteEnvironment(id);
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

}
