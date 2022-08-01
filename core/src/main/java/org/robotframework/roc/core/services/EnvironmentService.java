package org.robotframework.roc.core.services;

import org.robotframework.roc.core.dto.EnvironmentCreateDto;
import org.robotframework.roc.core.dto.EnvironmentUpdateDto;
import org.robotframework.roc.core.models.Environment;

import java.util.List;
import java.util.Optional;

public interface EnvironmentService extends CRUDService<Long> {
    Environment createEnvironment(Environment environment);

    Environment createEnvironment(Long id, EnvironmentCreateDto dto) throws Exception;

    Environment updateEnvironment(Long id, EnvironmentUpdateDto dto) throws Exception;

    Environment updateEnvironment(Environment environment, EnvironmentUpdateDto dto) throws Exception;

    void deleteEnvironment(Long id);

    List<Environment> getEnvironments(Long projectId);

    Optional<Environment> getEnvironmentById(Long id);

}
