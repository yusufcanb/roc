package org.robotframework.roc.platform.agent.services;

import org.robotframework.roc.core.models.Agent;
import org.robotframework.roc.core.services.AgentService;
import org.robotframework.roc.platform.agent.repositories.AgentRepository;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Collection;

@Service
public class BasicAgentService implements AgentService {

    final
    AgentRepository factoryRepository;

    public BasicAgentService(AgentRepository factoryRepository) {
        this.factoryRepository = factoryRepository;
    }

    @Override
    public Long createAgent(Agent agent) {
        this.generateAccessTokens(agent);
        return factoryRepository.save(agent).getId();
    }

    @Override
    public void updateAgent(Long id, Agent agent) {
        if (factoryRepository.existsById(id)) {
            agent.setId(id);
            factoryRepository.save(agent);
        }
    }

    @Override
    public void deleteAgent(Long id) {
        factoryRepository.deleteById(id);
    }

    @Override
    public Collection<Agent> getAllAgentsByProject(Long projectId) {
        return factoryRepository.findAll();
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
        return factoryRepository.existsById(id);
    }
}
