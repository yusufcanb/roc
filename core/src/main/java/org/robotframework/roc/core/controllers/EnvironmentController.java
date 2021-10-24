package org.robotframework.roc.core.controllers;

import org.robotframework.roc.core.models.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface EnvironmentController {

    ResponseEntity<List<Environment>> getEnvironments(@RequestParam Long projectId);

    ResponseEntity<Environment> getEnvironmentById(@RequestParam Long environmentId);

    ResponseEntity<Environment> createNewEnvironment(@RequestParam Long projectId, @RequestBody Environment environment);

    ResponseEntity<Environment> updateEnvironmentById(@RequestParam Long environmentId);

    ResponseEntity<Environment> deleteEnvironmentById(@RequestParam Long environmentId);
}
