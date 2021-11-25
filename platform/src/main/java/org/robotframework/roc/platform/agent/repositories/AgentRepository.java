package org.robotframework.roc.platform.agent.repositories;

import org.robotframework.roc.core.models.Agent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;

public interface AgentRepository extends JpaRepository<Agent, Long> {
}
