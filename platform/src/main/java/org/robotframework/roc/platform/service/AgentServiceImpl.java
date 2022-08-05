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

import lombok.extern.slf4j.Slf4j;
import org.robotframework.roc.core.agent.AgentCreateDTO;
import org.robotframework.roc.core.agent.AgentNotFoundException;
import org.robotframework.roc.core.agent.Agent;
import org.robotframework.roc.core.agent.AgentService;
import org.robotframework.roc.platform.repository.AgentRepository;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
@Slf4j
public class AgentServiceImpl implements AgentService {

    final AgentRepository agentRepository;
    final RedisConnection redisConnection;

    public AgentServiceImpl(AgentRepository agentRepository, RedisTemplate<String, Object> redisTemplate) {
        this.agentRepository = agentRepository;
        this.redisConnection = Objects.requireNonNull(redisTemplate.getConnectionFactory()).getConnection();
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
        agent.setPlatform(dto.getPlatform());
        agent.setArch(dto.getArch());
        agent.setDockerVersion(dto.getDockerVersion());
        agent.setLastSeen(Date.from(Instant.now()));
        agent = agentRepository.save(agent);

        redisConnection.publish("agent.created".getBytes(StandardCharsets.UTF_8), agent.getId().getBytes(StandardCharsets.UTF_8));
        return agent;
    }

    @Override
    public void updateAgent(String id, Agent agent) {
        if (agentRepository.existsById(id)) {
            agent.setId(id);
            agentRepository.save(agent);
        }
    }

    @Override
    public void deleteAgent(String id) {
        agentRepository.deleteById(id);
        redisConnection.publish("agent.deleted".getBytes(StandardCharsets.UTF_8), id.getBytes(StandardCharsets.UTF_8));
    }

    @Override
    public Collection<Agent> getAllAgents() {
        return agentRepository.findAll();
    }

    @Override
    public Optional<Agent> getAgentById(String id) {
        return agentRepository.findById(id);
    }

    @Override
    public void heartBeat(String id) throws AgentNotFoundException {
        Optional<Agent> found = agentRepository.findById(id);
        if (found.isEmpty()) {
            throw new AgentNotFoundException();
        }
        Agent agent = found.get();
        agent.setLastSeen(Date.from(Instant.now()));
        agentRepository.save(agent);
        redisConnection.publish("agent.ping".getBytes(StandardCharsets.UTF_8), id.getBytes(StandardCharsets.UTF_8));
    }

    @Scheduled(cron = "*/2 * * * * ?")
    public void destroyInactiveAgents() {
        List<Agent> agents = agentRepository.findAll();
        agents.forEach(agent -> {
            long diff = agent.getLastSeen().getTime() - Date.from(Instant.now()).getTime();
            if (Math.abs(TimeUnit.MILLISECONDS.toSeconds(diff)) > 2) {
                log.info("Removing agent {} for 5 seconds of inactivity", agent.getName());
                agentRepository.deleteById(agent.getId());
            }
        });
    }

    @Override
    public boolean isExists(String id) {
        return agentRepository.existsById(id);
    }
}
