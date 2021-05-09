package io.yusufcanb.rpa.platform.controller;

import com.yusufcanb.rpa.core.beans.WsMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class AgentWsController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/agents")
    public void chatEndpoint(@Payload WsMessage wsMessage) {
        System.out.println(wsMessage);
        messagingTemplate.convertAndSend(String.format("/{}", wsMessage.getSender()), wsMessage);
    }
}
