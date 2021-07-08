package org.robotframework.roc.agent.ws;

import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;

@Slf4j
public class ClientStompSessionHandler extends StompSessionHandlerAdapter {

    @Override
    public void afterConnected(StompSession session, StompHeaders headers) {
        log.info("Client connected: headers {}", headers);
        session.subscribe("/queue/busybox", this);
    }

    @Override
    public void handleFrame(StompHeaders headers, Object payload) {
        log.info("Received frame: payload {}, headers {}", payload, headers);
    }
}
