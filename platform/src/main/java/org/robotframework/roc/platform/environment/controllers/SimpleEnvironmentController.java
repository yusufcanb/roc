package org.robotframework.roc.platform.environment.controllers;

import org.robotframework.roc.core.controllers.EnvironmentController;
import org.robotframework.roc.core.models.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SimpleEnvironmentController implements EnvironmentController {

    @RequestMapping(value = "/environment", method = RequestMethod.GET)
    @Override
    public ResponseEntity<List<Environment>> getEnvironments(@RequestParam Long projectId) {
        return new ResponseEntity<>(null, HttpStatus.NOT_IMPLEMENTED);
    }

    @RequestMapping(value = "/environment", method = RequestMethod.POST)
    @Override
    public ResponseEntity<Long> createNewEnvironment(@RequestParam Long projectId, @RequestBody Environment environment) {
        return new ResponseEntity<>(null, HttpStatus.NOT_IMPLEMENTED);
    }

    @RequestMapping(value = "/environment/{id}", method = RequestMethod.GET)
    @Override
    public ResponseEntity<Environment> getEnvironmentById(@PathVariable Long id) {
        return new ResponseEntity<>(null, HttpStatus.NOT_IMPLEMENTED);
    }

    @RequestMapping(value = "/environment/{id}", method = RequestMethod.PUT)
    @Override
    public ResponseEntity<Environment> updateEnvironmentById(@PathVariable Long id) {
        return new ResponseEntity<>(null, HttpStatus.NOT_IMPLEMENTED);
    }

    @RequestMapping(value = "/environment/{id}", method = RequestMethod.DELETE)
    @Override
    public ResponseEntity<Environment> deleteEnvironmentById(@PathVariable Long id) {
        return new ResponseEntity<>(null, HttpStatus.NOT_IMPLEMENTED);
    }

}
