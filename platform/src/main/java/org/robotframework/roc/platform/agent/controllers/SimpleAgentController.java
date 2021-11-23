package org.robotframework.roc.platform.agent.controllers;

import org.robotframework.roc.core.controllers.AgentController;
import org.robotframework.roc.core.models.Agent;
import org.robotframework.roc.core.services.AgentService;
import org.robotframework.roc.core.services.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Optional;

@RestController
public class SimpleAgentController implements AgentController {

    final
    AgentService agentService;

    final
    ProjectService projectService;

    public SimpleAgentController(AgentService agentService, ProjectService projectService) {
        this.agentService = agentService;
        this.projectService = projectService;
    }

    @RequestMapping(value = "/agent", method = RequestMethod.GET, params = {"projectId"})
    @Override
    public ResponseEntity<Collection<Agent>> getAgents(@RequestParam Long projectId) {
        if (projectService.isExists(projectId)) {
            return new ResponseEntity<>(agentService.getAllAgentsByProject(projectId), HttpStatus.OK);
        } else
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @RequestMapping(value = "/agent", method = RequestMethod.POST)
    @Override
    public ResponseEntity<Long> createNewAgent(Agent agent) {
        Long created = agentService.createAgent(agent);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/agent/{id}", method = RequestMethod.GET)
    @Override
    public ResponseEntity<Agent> getAgentById(@PathVariable Long id) {
        Optional<Agent> agent = agentService.getAgentById(id);
        if (agent.isPresent()) {
            return new ResponseEntity<>(agent.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/agent/{id}", method = RequestMethod.PUT)
    @Override
    public ResponseEntity<Agent> updateAgentById(@PathVariable Long id, @RequestBody Agent agent) {
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
    public ResponseEntity<String> heartBeat(@PathVariable Long id) {
        agentService.heartBeat(id);
        return new ResponseEntity<>("OK!", HttpStatus.OK);
    }

    @RequestMapping(value = "/agent/{id}", method = RequestMethod.DELETE)
    @Override
    public ResponseEntity<Agent> deleteAgentById(@PathVariable Long id) {
        Optional<Agent> agentToUpdate = agentService.getAgentById(id);
        if (agentToUpdate.isPresent()) {
            agentService.deleteAgent(id);
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

}
