package org.robotframework.roc.core.controllers;

import org.robotframework.roc.core.models.Agent;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Collection;

public interface AgentController {

    ResponseEntity<Collection<Agent>> getAgents(@RequestParam Long projectId);

    ResponseEntity<Long> createNewAgent(@RequestBody Agent agent);

    ResponseEntity<Agent> getAgentById(@PathVariable Long id);

    ResponseEntity<Agent> updateAgentById(@PathVariable Long id, @RequestBody Agent agent);

    ResponseEntity<String> heartBeat(@PathVariable Long id);

    ResponseEntity<Agent> deleteAgentById(@PathVariable Long id);
}
