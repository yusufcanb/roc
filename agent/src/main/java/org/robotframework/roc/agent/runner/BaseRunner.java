package org.robotframework.roc.agent.runner;

import lombok.Getter;
import lombok.Setter;
import org.robotframework.roc.agent.AgentRuntime;
import org.robotframework.roc.agent.api.PlatformApi;

public abstract class BaseRunner implements JobRunner {


    public AgentRuntime runtime;

    public PlatformApi platform;

    public BaseRunner(AgentRuntime runtime, PlatformApi platform) {
        this.runtime = runtime;
        this.platform = platform;

    }

}
