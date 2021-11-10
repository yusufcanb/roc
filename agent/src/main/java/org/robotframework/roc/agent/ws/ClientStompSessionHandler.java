package org.robotframework.roc.agent.ws;

import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.robotframework.roc.agent.job.SimpleJobRunner;
import org.robotframework.roc.core.dto.stomp.StompPayload;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.util.MimeTypeUtils;

@Slf4j
public class ClientStompSessionHandler extends StompSessionHandlerAdapter {

    private String agentId;
    private StompSession stompSession;
    private SimpleJobRunner jobRunner;

    public ClientStompSessionHandler(String agentId, SimpleJobRunner jobRunner) {
        this.agentId = agentId;
        this.jobRunner = jobRunner;
    }

    @Override
    public void afterConnected(StompSession session, StompHeaders headers) {
        log.info("Client connected: headers {}", headers);
        this.stompSession = session;
        String destination = String.format("/queue/events.%s", this.agentId);

        StompHeaders subscriptionHeaders = new StompHeaders();
        subscriptionHeaders.setAck("client");
        subscriptionHeaders.setDestination(destination);
        subscriptionHeaders.setContentType(MimeTypeUtils.TEXT_PLAIN);
        session.subscribe(subscriptionHeaders, this);
    }

    @Override
    public void handleFrame(StompHeaders headers, Object payload) {
        log.info("Session id is: {}", this.stompSession.getSessionId());
        log.info("Received frame: payload {}, headers {}", payload, headers);

        Gson gson = new Gson();
        StompPayload message = gson.fromJson(payload.toString(), StompPayload.class);
        try {
            jobRunner.run(message.getJobId());
        } catch (Exception e) {
            log.error(e.getMessage());
        }
        stompSession.acknowledge(headers.getAck(), true);
    }

}



