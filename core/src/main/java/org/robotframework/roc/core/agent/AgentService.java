package org.robotframework.roc.core.agent;

import org.robotframework.roc.core.CRUDService;

import java.util.Collection;
import java.util.Optional;

public interface AgentService extends CRUDService<Long> {
    Agent createAgent(Agent agent);

    Agent createAgent(AgentCreateDTO dto);

    void updateAgent(Long id, Agent agent);

    void deleteAgent(Long id);

    Collection<Agent> getAllAgents();

    Optional<Agent> getAgentById(Long id);

    void heartBeat(Long id) throws AgentNotFoundException;

}
