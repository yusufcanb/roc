package org.robotframework.roc.core.dto.agent;

import lombok.Data;
import org.robotframework.roc.core.beans.OS;

@Data
public class AgentCreateDTO {
    private String name;
    private String displayName;
    private OS os;

    private String accessKey;
    private String accessSecret;

    private boolean initialized;
}
