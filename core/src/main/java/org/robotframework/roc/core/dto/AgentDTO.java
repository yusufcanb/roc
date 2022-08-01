package org.robotframework.roc.core.dto;

import org.robotframework.roc.core.interfaces.DTO;
import org.robotframework.roc.core.models.Agent;

public class AgentDTO implements DTO<Agent, AgentDTO> {
    public String name;

    @Override
    public AgentDTO fromModel(Agent model) {
        AgentDTO dto = new AgentDTO();
        dto.name = model.getName();
        return dto;
    }
}
