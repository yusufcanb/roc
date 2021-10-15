package org.robotframework.roc.agent.ws;

import com.google.gson.Gson;
import com.google.gson.JsonParseException;
import lombok.extern.slf4j.Slf4j;
import org.robotframework.roc.agent.EventQueue;
import org.robotframework.roc.agent.payload.StompPayload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class ClientStompSessionHandler extends StompSessionHandlerAdapter {

    @Autowired
    EventQueue queue;

    @Value("${roc.agent.id}")
    private String agentId;

    @Override
    public void afterConnected(StompSession session, StompHeaders headers) {
        log.info("Client connected: headers {}", headers);
        session.subscribe(String.format("/queue/events.%s", this.agentId), this);
    }

    @Override
    public void handleFrame(StompHeaders headers, Object payloadObj) {
        log.info("Received frame: payload {}, headers {}", payloadObj, headers);
        Gson g = new Gson();
        try {
            StompPayload payload = g.fromJson(payloadObj.toString(), StompPayload.class);
            queue.getQueue().add(payload);
        } catch (JsonParseException exception) {
            log.error(exception.getMessage());
        }
    }

}



