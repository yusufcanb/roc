package org.robotframework.roc.core.dto.stomp;

import lombok.Data;

@Data
public class StompPayload {
    private String eventType;
    private Object eventPayload;
    private Long jobId;
    private String signature;
}
