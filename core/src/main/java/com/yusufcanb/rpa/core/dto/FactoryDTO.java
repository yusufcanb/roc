package com.yusufcanb.rpa.core.dto;

import com.yusufcanb.rpa.core.interfaces.DTO;
import com.yusufcanb.rpa.core.models.Factory;

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
