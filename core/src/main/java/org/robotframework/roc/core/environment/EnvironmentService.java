package org.robotframework.roc.core.environment;

import org.robotframework.roc.core.CRUDService;

import java.util.List;
import java.util.Optional;

public interface EnvironmentService extends CRUDService<String> {
    Environment createEnvironment(Environment environment);

    Environment createEnvironment(String projectId, EnvironmentCreateDto dto) throws Exception;

    Environment updateEnvironment(String environmentId, EnvironmentUpdateDto dto) throws Exception;

    Environment updateEnvironment(Environment environment, EnvironmentUpdateDto dto) throws Exception;

    void deleteEnvironment(String id);

    List<Environment> getEnvironments(String projectId);

    Optional<Environment> getEnvironmentById(String environmentId);

}
