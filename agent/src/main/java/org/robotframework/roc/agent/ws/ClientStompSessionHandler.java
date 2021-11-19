package org.robotframework.roc.agent.ws;

import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.robotframework.roc.agent.job.SimpleJobRunner;
import org.robotframework.roc.core.dto.stomp.StompPayload;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.util.MimeTypeUtils;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

@Slf4j
public class ClientStompSessionHandler extends StompSessionHandlerAdapter {

    private SimpleJobRunner jobRunner;

    public ClientStompSessionHandler(SimpleJobRunner jobRunner) {
        this.jobRunner = jobRunner;
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
        Gson gson = new Gson();
        StompPayload message = gson.fromJson(payload.toString(), StompPayload.class);
        try {
            Executor executor = Executors.newFixedThreadPool(5);
            executor.execute(() -> {
                try {
                    jobRunner.run(message.getJobId());
                } catch (Exception exception) {
                    exception.printStackTrace();
                }
            });
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }

}



