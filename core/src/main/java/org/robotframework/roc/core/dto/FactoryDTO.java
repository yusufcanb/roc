package org.robotframework.roc.core.dto;

import org.robotframework.roc.core.interfaces.DTO;
import org.robotframework.roc.core.models.Factory;

public class FactoryDTO implements DTO<Factory, FactoryDTO> {
    public String name;

    public String apiKey;
    public String apiSecret;

    @Override
    public FactoryDTO fromModel(Factory model) {
        FactoryDTO dto = new FactoryDTO();
        dto.name = model.getDisplayName();
        return dto;
    }
}
