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

package org.robotframework.roc.platform.controller;

import lombok.extern.slf4j.Slf4j;
import org.robotframework.roc.core.agent.*;
import org.robotframework.roc.core.project.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;
import java.util.Optional;

@RestController
@Slf4j
public class AgentControllerImpl extends BaseController implements AgentController {

    final AgentService agentService;

    final ProjectService projectService;

    public AgentControllerImpl(AgentService agentService, ProjectService projectService) {
        this.agentService = agentService;
        this.projectService = projectService;
    }

    @RequestMapping(value = "/agent", method = RequestMethod.GET)
    @Override
    public ResponseEntity<Collection<Agent>> getAgents() {
        return new ResponseEntity<>(agentService.getAllAgents(), HttpStatus.OK);
    }

    @RequestMapping(value = "/agent", method = RequestMethod.POST)
    @Override
    public ResponseEntity<Agent> createNewAgent(@Valid AgentCreateDTO agent) {
        Agent created = agentService.createAgent(agent);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/agent/{id}", method = RequestMethod.GET)
    @Override
    public ResponseEntity<Agent> getAgentById(@PathVariable String id) {
        Optional<Agent> agent = agentService.getAgentById(id);
        return agent.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    @RequestMapping(value = "/agent/{id}", method = RequestMethod.PUT)
    @Override
    public ResponseEntity<Agent> updateAgentById(@PathVariable String id, @RequestBody Agent agent) {
        Optional<Agent> agentToUpdate = agentService.getAgentById(id);
        if (agentToUpdate.isPresent()) {
            agentService.updateAgent(id, agent);
            return new ResponseEntity<>(agent, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/agent/{id}/health-check", method = RequestMethod.POST)
    @Override
    public ResponseEntity<String> heartBeat(@PathVariable String id) {
        try {
            agentService.heartBeat(id);
        } catch (AgentNotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("OK!", HttpStatus.OK);
    }

    @RequestMapping(value = "/agent/{id}", method = RequestMethod.DELETE)
    @Override
    public ResponseEntity<Agent> deleteAgentById(@PathVariable String id) {
        Optional<Agent> agentToUpdate = agentService.getAgentById(id);
        if (agentToUpdate.isPresent()) {
            agentService.deleteAgent(id);
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

}
