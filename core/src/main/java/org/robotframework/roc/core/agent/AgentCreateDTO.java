package org.robotframework.roc.core.agent;

import lombok.Data;
import reactor.core.publisher.FluxSink;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.ArrayList;
import java.util.List;

@Data
public class AgentCreateDTO {

    @NotNull
    @Pattern(regexp = "^[a-z0-9-]+$", flags = Pattern.Flag.UNICODE_CASE)
    private String name;

    @NotNull
    private String hostName;

    @NotNull
    private String platform;

    @NotNull
    private String arch;

    @NotNull
    private String version;

    @NotNull
    private String dockerVersion;

    private List<String> tags = new ArrayList<>();
}
