package org.robotframework.roc.platform.project;

import org.robotframework.roc.core.models.CodeRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CodeRepoRepository extends JpaRepository<CodeRepository, Long> {
}
