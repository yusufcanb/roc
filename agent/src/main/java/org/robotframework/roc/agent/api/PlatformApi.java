package org.robotframework.roc.agent.api;

import org.springframework.stereotype.Service;

@Service
public class PlatformApi {
    public JobApi jobApi = new JobApi();
    public TaskForceApi taskForceApi = new TaskForceApi();
}
