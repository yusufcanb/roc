package org.robotframework.roc.core.environment;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface EnvironmentController {

    ResponseEntity<List<Environment>> getEnvironments(@RequestParam Long projectId);

    ResponseEntity<Environment> getEnvironmentById(@PathVariable Long id);

    ResponseEntity<Environment> createNewEnvironment(@RequestParam Long projectId, @RequestBody EnvironmentCreateDto dto);

    ResponseEntity<Environment> updateEnvironmentById(@PathVariable Long environmentId, @RequestBody EnvironmentUpdateDto dto);

    ResponseEntity<Environment> deleteEnvironmentById(@PathVariable Long environmentId);

}
