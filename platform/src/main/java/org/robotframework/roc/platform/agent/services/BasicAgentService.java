package org.robotframework.roc.platform.agent.services;

import org.robotframework.roc.core.models.Agent;
import org.robotframework.roc.core.services.AgentService;
import org.robotframework.roc.platform.agent.repositories.AgentRepository;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Collection;
import java.util.Optional;

@Service
public class BasicAgentService implements AgentService {

    final
    AgentRepository agentRepository;

    public BasicAgentService(AgentRepository agentRepository) {
        this.agentRepository = agentRepository;
    }

    @Override
    public Long createAgent(Agent agent) {
        this.generateAccessTokens(agent);
        return agentRepository.save(agent).getId();
    }

    @Override
    public void updateAgent(Long id, Agent agent) {
        if (agentRepository.existsById(id)) {
            agent.setId(id);
            agentRepository.save(agent);
        }
    }

    @Override
    public void deleteAgent(Long id) {
        agentRepository.deleteById(id);
    }

    @Override
    public Collection<Agent> getAllAgentsByProject(Long projectId) {
        return agentRepository.findAll();
    }

    @Override
    public Optional<Agent> getAgentById(Long id) {
        return Optional.of(agentRepository.getOne(id));
    }

    @Override
    public void generateAccessTokens(Agent agent) {
        SecureRandom secureRandom = new SecureRandom();
        Base64.Encoder base64Encoder = Base64.getUrlEncoder();

        byte[] randomBytes = new byte[24];
        secureRandom.nextBytes(randomBytes);
        agent.setAccessKey(base64Encoder.encodeToString(randomBytes));

        secureRandom.nextBytes(randomBytes);
        agent.setAccessSecret(base64Encoder.encodeToString(randomBytes));
    }

    @Override
    public boolean isExists(Long id) {
        return agentRepository.existsById(id);
    }
}
