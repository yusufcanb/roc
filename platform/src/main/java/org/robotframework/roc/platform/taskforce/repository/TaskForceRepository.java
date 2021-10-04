package org.robotframework.roc.platform.taskforce.repository;

import org.robotframework.roc.core.models.TaskForce;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskForceRepository extends JpaRepository<TaskForce, Long> {
}
