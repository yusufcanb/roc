package org.robotframework.roc.core.services;

import org.robotframework.roc.core.models.Agent;

import java.util.Collection;

public interface AgentService extends CRUDService<Long> {
    Long createAgent(Agent agent);

    void updateAgent(Long id, Agent agent);

    void deleteAgent(Long id);

    Collection<Agent> getAllAgentsByProject(Long projectId);

    public void generateAccessTokens(Agent agent);
}
