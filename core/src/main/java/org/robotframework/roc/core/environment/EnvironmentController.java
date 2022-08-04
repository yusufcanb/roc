package org.robotframework.roc.core.environment;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface EnvironmentController {

    ResponseEntity<List<Environment>> getEnvironments(@RequestParam String projectId);

    ResponseEntity<Environment> getEnvironmentById(@PathVariable String environmentId);

    ResponseEntity<Environment> createNewEnvironment(@RequestParam String projectId, @RequestBody EnvironmentCreateDto dto);

    ResponseEntity<Environment> updateEnvironmentById(@PathVariable String environmentId, @RequestBody EnvironmentUpdateDto dto);

    ResponseEntity<Environment> deleteEnvironmentById(@PathVariable String environmentId);

}
