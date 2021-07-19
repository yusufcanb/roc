package org.robotframework.roc.platform.dto;

public class ErrorerResponseContent extends ResponseContent {
    public ErrorerResponseContent(String message) {
        this.setSuccess(false);
        this.setPayload(message);
    }
}
