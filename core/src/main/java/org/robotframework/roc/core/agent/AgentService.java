package org.robotframework.roc.core.agent;

import org.robotframework.roc.core.CRUDService;

import java.util.Collection;
import java.util.Optional;

public interface AgentService extends CRUDService<String> {
    Agent createAgent(Agent agent);

    Agent createAgent(AgentCreateDTO dto);

    void updateAgent(String agentId, Agent agent);

    void deleteAgent(String agentId);

    Collection<Agent> getAllAgents();

    Optional<Agent> getAgentById(String id);

    void heartBeat(String id) throws AgentNotFoundException;

}
