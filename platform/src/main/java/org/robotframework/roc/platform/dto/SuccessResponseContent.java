package org.robotframework.roc.platform.dto;

public class SuccessResponseContent<T> extends ResponseContent {

    public SuccessResponseContent(T payload) {
        this.setSuccess(true);
        this.setPayload(payload);
    }
}
