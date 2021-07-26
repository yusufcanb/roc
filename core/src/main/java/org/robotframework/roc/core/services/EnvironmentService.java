package org.robotframework.roc.core.services;

import org.robotframework.roc.core.models.Environment;

import java.util.Collection;
import java.util.Optional;

public interface EnvironmentService extends CRUDService<Long> {
    Environment createEnvironment(Environment environment);

    Environment updateEnvironment(Long id, Environment environment);

    void deleteEnvironment(Long id);

    Collection<Environment> getEnvironments();

    Optional<Environment> getEnvironmentById(Long id);

}
