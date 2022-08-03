package org.robotframework.roc.core.agent;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Collection;

public interface AgentController {

    ResponseEntity<Collection<Agent>> getAgents();

    ResponseEntity<Agent> createNewAgent(@RequestBody AgentCreateDTO agent);

    ResponseEntity<Agent> getAgentById(@PathVariable Long id);

    ResponseEntity<Agent> updateAgentById(@PathVariable Long id, @RequestBody Agent agent);
    
    ResponseEntity<Agent> deleteAgentById(@PathVariable Long id);

    ResponseEntity<String> heartBeat(@PathVariable Long id);
}
