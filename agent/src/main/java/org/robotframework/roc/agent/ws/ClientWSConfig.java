package org.robotframework.roc.agent.ws;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.messaging.converter.StringMessageConverter;
import org.springframework.messaging.simp.stomp.StompSessionHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.client.WebSocketClient;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.RestTemplateXhrTransport;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.Transport;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;

import java.util.ArrayList;
import java.util.List;

@Controller
@Slf4j
public class ClientWSConfig {

    @Bean
    public WebSocketStompClient webSocketStompClient(WebSocketClient webSocketClient,
                                                     StompSessionHandler stompSessionHandler) {
        WebSocketStompClient webSocketStompClient = new WebSocketStompClient(webSocketClient);
        webSocketStompClient.setMessageConverter(new StringMessageConverter());
        String url = "ws://{host}:{port}/ws";
        webSocketStompClient.connect(url, stompSessionHandler, "localhost", 8080);
        return webSocketStompClient;
    }

    @Bean
    public WebSocketClient webSocketClient() {
        List<Transport> transportList = new ArrayList<>();
        transportList.add(new WebSocketTransport(new StandardWebSocketClient()));
        transportList.add(new RestTemplateXhrTransport());
        return new SockJsClient(transportList);
    }

    @Bean
    public StompSessionHandler stompSessionHandler() {
        return new ClientStompSessionHandler();
    }
}
