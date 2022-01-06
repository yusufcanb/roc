package org.robotframework.roc.agent.job;

import lombok.extern.slf4j.Slf4j;
import org.robotframework.roc.core.models.Job;

@Slf4j
public class RepositoryRunner implements JobRunner {

    @Override
    public void run(Job job) {
        log.info("Repository runner {}", job.getId());
    }

}
