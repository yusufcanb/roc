package org.robotframework.roc.platform.dto;

import lombok.Data;

@Data
public abstract class ResponseContent {
    private boolean success;
    private Object payload;
}
