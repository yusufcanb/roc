package org.robotframework.roc.agent.payload;

import lombok.Data;

@Data
public class StompPayload {
    private String eventType;
    private Object eventPayload;
    private String jobId;
    private String signature;
}
