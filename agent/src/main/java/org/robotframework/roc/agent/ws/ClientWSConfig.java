package org.robotframework.roc.agent.ws;

import lombok.extern.slf4j.Slf4j;
import org.robotframework.roc.agent.AgentRuntime;
import org.robotframework.roc.agent.job.SimpleJobRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.task.TaskSchedulerBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.converter.StringMessageConverter;
import org.springframework.messaging.simp.stomp.StompSessionHandler;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
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

    @Autowired
    AgentRuntime agentRuntime;

    @Autowired
    private SimpleJobRunner jobRunner;

    @Bean
    public WebSocketStompClient webSocketStompClient(
            WebSocketClient webSocketClient,
            StompSessionHandler stompSessionHandler,
            TaskScheduler taskScheduler
    ) {
        WebSocketStompClient webSocketStompClient = new WebSocketStompClient(webSocketClient);

        WebSocketHttpHeaders stompHeaders = new WebSocketHttpHeaders();
        stompHeaders.add("login", "roc");
        stompHeaders.add("passcode", "roc");

        webSocketStompClient.setMessageConverter(new StringMessageConverter());
        webSocketStompClient.setTaskScheduler(taskScheduler);
        webSocketStompClient.setReceiptTimeLimit(3600L * 3600L);

        String url = "ws://{host}:{port}/ws";
        String host = System.getProperty("roc.platform.host");
        String port = System.getProperty("roc.platform.port");

        log.info("Stomp client url: {}", String.format(url, host, port));
        webSocketStompClient.connect(url, stompHeaders, stompSessionHandler, host, Integer.valueOf(port));
        return webSocketStompClient;
    }

    @Bean
    public ThreadPoolTaskScheduler taskScheduler(TaskSchedulerBuilder builder) {
        return builder.poolSize(1).build();
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
        return new ClientStompSessionHandler(jobRunner);
    }


}
