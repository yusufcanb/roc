package org.robotframework.roc.platform.environment.services;

import org.robotframework.roc.core.models.Environment;
import org.robotframework.roc.core.services.EnvironmentService;
import org.robotframework.roc.platform.environment.repositories.EnvironmentRepository;
import org.robotframework.roc.platform.project.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BasicEnvironmentService implements EnvironmentService {

    final
    EnvironmentRepository environmentRepository;

    final
    ProjectRepository projectRepository;

    public BasicEnvironmentService(EnvironmentRepository environmentRepository, ProjectRepository projectRepository) {
        this.environmentRepository = environmentRepository;
        this.projectRepository = projectRepository;
    }

    @Override
    public boolean isExists(Long aLong) {
        return false;
    }

    @Override
    public List<Environment> getEnvironments(Long projectId) {
        return environmentRepository.findAll();
    }

    @Override
    public Optional<Environment> getEnvironmentById(Long id) {
        return environmentRepository.findById(id);
    }

    @Override
    public Environment createEnvironment(Environment environment) {
        environmentRepository.save(environment);
        return environment;
    }

    @Override
    public Environment createEnvironment(Long id, Environment environment) {

        return null;
    }

    @Override
    public Environment updateEnvironment(Long id, Environment environment) {
        return null;
    }

    @Override
    public void deleteEnvironment(Long id) {

    }
}
