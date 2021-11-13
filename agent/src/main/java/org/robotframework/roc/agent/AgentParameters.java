package org.robotframework.roc.agent;

import lombok.Data;
import picocli.CommandLine;

@Data
public class AgentParameters {

    @CommandLine.Option(names = {"-h", "--host"}, description = "Host URL of Robot Operation Center", required = true)
    String host;

    @CommandLine.Option(names = {"-p", "--port"}, description = "Port URL of Robot Operation Center", required = true)
    Integer port;

    @CommandLine.Option(names = {"-i", "--id"}, description = "Device Id", required = true)
    String agentId;

    @CommandLine.Option(names = {"--access-token"}, description = "Access key for authentication")
    String accessToken;

    @CommandLine.Option(names = {"--access-secret"}, description = "Access token for authentication")
    String accessSecret;

    @CommandLine.Option(names = "--help", usageHelp = true, description = "display a help message")
    private boolean helpRequested = false;

}
