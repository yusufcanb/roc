package org.robotframework.roc.platform.factory.repositories;

import org.robotframework.roc.core.models.Factory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FactoryRepository extends JpaRepository<Factory, Long> {
}
