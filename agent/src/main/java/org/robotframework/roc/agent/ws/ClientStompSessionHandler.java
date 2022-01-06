package org.robotframework.roc.agent.ws;

import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.util.MimeTypeUtils;

@Slf4j
public class ClientStompSessionHandler extends StompSessionHandlerAdapter {


    public ClientStompSessionHandler() {
    }

    @Override
    public void afterConnected(StompSession session, StompHeaders headers) {
        log.info("Client connected: headers {}", headers);

        String destination = String.format("/queue/events.%s", System.getProperty("roc.agent.id"));
        StompHeaders subscriptionHeaders = new StompHeaders();
        subscriptionHeaders.setAck("auto");
        subscriptionHeaders.setDestination(destination);
        subscriptionHeaders.setContentType(MimeTypeUtils.TEXT_PLAIN);
        session.subscribe(subscriptionHeaders, this);
    }

    @Override
    public void handleFrame(StompHeaders headers, Object payload) {
        log.info("Received frame: payload {}, headers {}", payload, headers);
        StompFrameHandler frameHandler = new StompFrameHandler();
        frameHandler.handle(headers, payload);
        log.info("Frame handled");
    }

}
