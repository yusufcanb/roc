package org.robotframework.roc.core.services;

import org.robotframework.roc.core.exceptions.ProjectNotFoundException;
import org.robotframework.roc.core.models.Agent;
import org.robotframework.roc.core.dto.agent.AgentCreateDTO;

import java.util.Collection;
import java.util.Optional;

public interface AgentService extends CRUDService<Long> {
    Long createAgent(Agent agent);

    Agent createAgent(Long projectId, AgentCreateDTO dto) throws ProjectNotFoundException;

    void updateAgent(Long id, Agent agent);

    void deleteAgent(Long id);

    Collection<Agent> getAllAgentsByProject(Long projectId);

    Optional<Agent> getAgentById(Long id);

    void heartBeat(Long id);

    void generateAccessTokens(Agent agent);

}
