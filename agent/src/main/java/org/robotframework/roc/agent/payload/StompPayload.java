package org.robotframework.roc.agent.payload;

import java.time.LocalDateTime;

public class StompPayload {
    private String eventType;
    private Object eventPayload;
    private LocalDateTime publishedAt;
}
