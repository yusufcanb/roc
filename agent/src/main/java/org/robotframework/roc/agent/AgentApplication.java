/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

package org.robotframework.roc.agent;

import org.robotframework.roc.core.beans.WsMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.web.socket.client.WebSocketClient;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;

import java.net.URISyntaxException;
import java.util.Scanner;


@Slf4j
public class AgentApplication {

    public static void main(String[] args) throws URISyntaxException {
        WebSocketClient client = new StandardWebSocketClient();
        WebSocketStompClient stompClient = new WebSocketStompClient(client);

        stompClient.setMessageConverter(new MappingJackson2MessageConverter());

        stompClient.connect("ws://localhost:8080", new StompSessionHandlerAdapter() {
            @Override
            public void afterConnected(StompSession session, StompHeaders connectedHeaders) {
                session.subscribe("/queue/agent.*", this);
//                    session.send("/app/chat", new WsMessage("factory", "Hello, world!"));
            }

            @Override
            public void handleFrame(StompHeaders headers, Object payload) {
                WsMessage msg = (WsMessage) payload;
                log.info("Received : " + msg.getMessage() + " from : " + msg.getSender());
            }
        });
        new Scanner(System.in).nextLine();
    }
}
