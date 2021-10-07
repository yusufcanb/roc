package org.robotframework.roc.platform.environment.repositories;

import org.robotframework.roc.core.models.Environment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnvironmentRepository extends JpaRepository<Environment, Long> {
}
