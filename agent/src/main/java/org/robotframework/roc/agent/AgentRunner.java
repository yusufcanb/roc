package org.robotframework.roc.agent;

import lombok.extern.slf4j.Slf4j;
import org.robotframework.roc.agent.api.PlatformApi;
import org.robotframework.roc.agent.runner.JobRunner;
import org.robotframework.roc.agent.runner.PackageRunner;
import org.robotframework.roc.agent.runner.RepositoryRunner;
import org.robotframework.roc.core.dto.stomp.StompPayload;
import org.robotframework.roc.core.models.Job;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@Slf4j
public class AgentRunner {

    final
    AgentRuntime runtime;

    final
    PlatformApi platform;

    public AgentRunner(AgentRuntime runtime, PlatformApi platformApi) {
        this.runtime = runtime;
        this.platform = platformApi;
    }

    public JobRunner getRunnerByRobot(String robot) {
        if (robot.startsWith("s3://")) {
            return new PackageRunner(runtime, platform);
        } else {
            return new RepositoryRunner(runtime, platform);
        }
    }

    public void handleMessage(StompPayload message) {
        Optional<Job> job = this.platform.jobApi.getJobById(message.getJobId());
        if (job.isPresent()) {
            log.info("Job found with id {}", job.get().getId());
            JobRunner runner = this.getRunnerByRobot(job.get().getTaskForce().getRobot());
            runner.run(job.get());
        } else {
            log.error("Job does not exists");
        }
    }
}
