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

package org.robotframework.roc.platform.service;

import org.robotframework.roc.core.dto.agent.AgentCreateDTO;
import org.robotframework.roc.core.models.Agent;
import org.robotframework.roc.core.services.AgentService;
import org.robotframework.roc.platform.repository.AgentRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Collection;
import java.util.Date;
import java.util.Optional;

@Service
public class BasicAgentService implements AgentService {

    final AgentRepository agentRepository;

    public BasicAgentService(AgentRepository agentRepository) {
        this.agentRepository = agentRepository;
    }

    @Override
    public Agent createAgent(Agent agent) {
        return agentRepository.save(agent);
    }

    @Override
    public Agent createAgent(AgentCreateDTO dto) {
        Agent agent = new Agent();
        agent.setName(dto.getName());
        agent.setTags(dto.getTags());
        agent.setHostName(dto.getHostName());
        agent.setDockerVersion(dto.getDockerVersion());
        agent.setLastSeen(Date.from(Instant.now()));
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
    public Collection<Agent> getAllAgents() {
        return agentRepository.findAll();
    }

    @Override
    public Optional<Agent> getAgentById(Long id) {
        return agentRepository.findById(id);
    }

    @Override
    public void heartBeat(Long id) {
        Agent agent = agentRepository.getOne(id);
        agent.setLastSeen(Date.from(Instant.now()));
        agentRepository.save(agent);
    }

    @Override
    public boolean isExists(Long id) {
        return agentRepository.existsById(id);
    }
}
