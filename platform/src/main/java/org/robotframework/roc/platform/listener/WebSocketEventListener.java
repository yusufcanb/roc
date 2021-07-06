package org.robotframework.roc.platform.listener;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@Slf4j
public class WebSocketEventListener {

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        log.debug(event.toString());
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        log.debug(event.toString());
    }
}
