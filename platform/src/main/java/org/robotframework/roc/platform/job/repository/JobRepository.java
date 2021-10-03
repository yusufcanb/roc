package org.robotframework.roc.platform.job.repository;

import org.robotframework.roc.core.models.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {
}
