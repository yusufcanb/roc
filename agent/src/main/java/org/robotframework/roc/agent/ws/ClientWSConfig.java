package org.robotframework.roc.agent.ws;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.converter.StringMessageConverter;
import org.springframework.messaging.simp.stomp.StompSessionHandler;
import org.springframework.web.socket.WebSocketHttpHeaders;
import org.springframework.web.socket.client.WebSocketClient;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.RestTemplateXhrTransport;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.Transport;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;

import java.util.ArrayList;
import java.util.List;

@Configuration
@Slf4j
public class ClientWSConfig {

    @Value("${roc.platform.host}")
    private String host;

    @Value("${roc.platform.port}")
    private Integer port;

    @Bean
    public WebSocketStompClient webSocketStompClient(WebSocketClient webSocketClient,
                                                     StompSessionHandler stompSessionHandler) {
        WebSocketStompClient webSocketStompClient = new WebSocketStompClient(webSocketClient);

        WebSocketHttpHeaders stompHeaders = new WebSocketHttpHeaders();
        stompHeaders.add("login", "roc");
        stompHeaders.add("passcode", "roc");

        webSocketStompClient.setMessageConverter(new StringMessageConverter());
        String url = "ws://{host}:{port}/ws";

        webSocketStompClient.connect(url, stompHeaders, stompSessionHandler, host, port);
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
