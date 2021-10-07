package org.robotframework.roc.platform.agent.controllers;

import org.robotframework.roc.core.controllers.AgentController;
import org.robotframework.roc.core.models.Agent;
import org.robotframework.roc.core.services.AgentService;
import org.robotframework.roc.core.services.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

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
}
