package org.robotframework.roc.agent;

import lombok.Getter;
import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.Queue;

@Component
public class EventQueue {

    @Getter
    private AgentParameters params;

    @Getter
    private Queue<Object> queue = new LinkedList<>();

    public EventQueue(AgentParameters params) {
        this.params = params;
    }

}
