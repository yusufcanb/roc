package org.robotframework.roc.platform.ws;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.server.RequestUpgradeStrategy;
import org.springframework.web.socket.server.standard.TomcatRequestUpgradeStrategy;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Value("${roc.platform.mq.host}")
    private String relayHost;

    @Value("${roc.platform.mq.port}")
    private Integer relayPort;

    @Value("${roc.platform.mq.user}")
    private String relayUser;

    @Value("${roc.platform.mq.password}")
    private String relayPwd;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        RequestUpgradeStrategy upgradeStrategy = new TomcatRequestUpgradeStrategy();
        registry.addEndpoint("/ws")
                .withSockJS();

        registry.addEndpoint("/ws")
                .setHandshakeHandler(new DefaultHandshakeHandler(upgradeStrategy))
                .setAllowedOrigins("*");

//        registry.addEndpoint("/ws").setAllowedOriginPatterns("*:*").withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/queue", "/topic");
        registry.enableStompBrokerRelay("/queue", "/topic")
                .setRelayHost(relayHost)
                .setRelayPort(relayPort)
                .setClientLogin(relayUser)
                .setClientPasscode(relayPwd)
                .setSystemLogin(relayUser)
                .setSystemPasscode(relayPwd);
    }

}
