package org.robotframework.roc.platform.ws;

import org.robotframework.roc.core.beans.WsMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin
public class AgentWsController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/hello/{id}")
    @SendTo("/queue/agent.*")
    public WsMessage chatEndpoint(@Payload WsMessage wsMessage, @DestinationVariable String id) {
        return wsMessage;
    }

}
