package org.robotframework.roc.platform.job.repository;

import org.robotframework.roc.core.models.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findAllByProjectId(Long projectId);

    List<Job> findAllByTaskForceId(Long taskForceId);
}
