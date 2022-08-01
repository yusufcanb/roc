package org.robotframework.roc.core.services;

import org.robotframework.roc.core.dto.agent.AgentCreateDTO;
import org.robotframework.roc.core.models.Agent;

import java.util.Collection;
import java.util.Optional;

public interface AgentService extends CRUDService<Long> {
    Agent createAgent(Agent agent);

    Agent createAgent(AgentCreateDTO dto);

    void updateAgent(Long id, Agent agent);

    void deleteAgent(Long id);

    Collection<Agent> getAllAgents();

    Optional<Agent> getAgentById(Long id);

    void heartBeat(Long id);

}
