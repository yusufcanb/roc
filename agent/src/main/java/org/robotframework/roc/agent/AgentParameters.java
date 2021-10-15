package org.robotframework.roc.agent;

import org.springframework.stereotype.Component;
import picocli.CommandLine;

@Component
public class AgentParameters {

    @CommandLine.Option(names = {"-h", "--host"}, description = "Host URL of Robot Operation Center")
    String host;

    @CommandLine.Option(names = {"-p", "--port"}, description = "Port URL of Robot Operation Center")
    String port;

    @CommandLine.Option(names = {"--access-token"}, description = "Access key for authentication")
    String accessToken;

    @CommandLine.Option(names = {"--access-secret"}, description = "Access token for authentication")
    String accessSecret;

    @CommandLine.Option(names = "--help", usageHelp = true, description = "display a help message")
    private boolean helpRequested = false;
}
