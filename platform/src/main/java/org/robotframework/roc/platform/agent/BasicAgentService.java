/*
 *   Copyright (c) 2021-2022 Yusuf Can Bayrak <yusufcanbayrak@gmail.com>
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 *   Contributors:
 *   Yusuf Can Bayrak - initial implementation and documentation.
 *
 */

package org.robotframework.roc.platform.agent;

import org.robotframework.roc.core.beans.OS;
import org.robotframework.roc.core.dto.agent.AgentCreateDTO;
import org.robotframework.roc.core.exceptions.ProjectNotFoundException;
import org.robotframework.roc.core.models.Agent;
import org.robotframework.roc.core.models.Project;
import org.robotframework.roc.platform.project.ProjectRepository;
import org.robotframework.roc.core.services.AgentService;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Instant;
import java.util.Base64;
import java.util.Collection;
import java.util.Date;
import java.util.Optional;

@Service
public class BasicAgentService implements AgentService {

    final
    ProjectRepository projectRepository;

    final
    AgentRepository agentRepository;

    public BasicAgentService(ProjectRepository projectRepository, AgentRepository agentRepository) {
        this.projectRepository = projectRepository;
        this.agentRepository = agentRepository;
    }

    @Override
    public Long createAgent(Agent agent) {
        this.generateAccessTokens(agent);
        return agentRepository.save(agent).getId();
    }

    @Override
    public Agent createAgent(Long projectId, AgentCreateDTO dto) throws ProjectNotFoundException {
        Optional<Project> optional = projectRepository.findById(projectId);

        if (optional.isEmpty()) {
            throw new ProjectNotFoundException();
        }

        Agent agent = new Agent();
        agent.setDisplayName(dto.getDisplayName());
        agent.setOs(OS.valueOf(dto.getOs()));
        agent.setProject(optional.get());
        agent.setInitialized(false);
        return agentRepository.save(agent);
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
        return agentRepository.findById(id);
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
    public void heartBeat(Long id) {
        Agent agent = agentRepository.getOne(id);
        agent.setLastActive(Date.from(Instant.now()));
        agentRepository.save(agent);
    }

    @Override
    public boolean isExists(Long id) {
        return agentRepository.existsById(id);
    }
}
