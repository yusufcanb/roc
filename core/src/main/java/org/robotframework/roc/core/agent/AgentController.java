package org.robotframework.roc.core.agent;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Collection;

public interface AgentController {

    ResponseEntity<Collection<Agent>> getAgents();

    ResponseEntity<Agent> createNewAgent(@RequestBody AgentCreateDTO agent);

    ResponseEntity<Agent> getAgentById(@PathVariable String id);

    ResponseEntity<Agent> updateAgentById(@PathVariable String id, @RequestBody Agent agent);
    
    ResponseEntity<Agent> deleteAgentById(@PathVariable String id);

    ResponseEntity<String> heartBeat(@PathVariable String id);
}
