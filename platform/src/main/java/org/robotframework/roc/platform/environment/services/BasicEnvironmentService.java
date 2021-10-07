package org.robotframework.roc.platform.environment.services;

import org.robotframework.roc.core.models.Environment;
import org.robotframework.roc.core.services.EnvironmentService;
import org.robotframework.roc.platform.environment.repositories.EnvironmentRepository;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
public class BasicEnvironmentService implements EnvironmentService {

    final
    EnvironmentRepository environmentRepository;

    public BasicEnvironmentService(EnvironmentRepository environmentRepository) {
        this.environmentRepository = environmentRepository;
    }

    @Override
    public boolean isExists(Long aLong) {
        return false;
    }

    @Override
    public Environment createEnvironment(Environment environment) {
        return null;
    }

    @Override
    public Environment updateEnvironment(Long id, Environment environment) {
        return null;
    }

    @Override
    public void deleteEnvironment(Long id) {

    }

    @Override
    public Collection<Environment> getEnvironments() {
        return null;
    }

    @Override
    public Optional<Environment> getEnvironmentById(Long id) {
        return Optional.empty();
    }
}
