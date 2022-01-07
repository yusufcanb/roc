package org.robotframework.roc.agent.runner;

import lombok.extern.slf4j.Slf4j;
import org.robotframework.roc.agent.AgentRuntime;
import org.robotframework.roc.agent.api.PlatformApi;
import org.robotframework.roc.agent.utils.ZipUtils;
import org.robotframework.roc.core.models.Environment;
import org.robotframework.roc.core.models.Job;
import org.robotframework.roc.core.models.TaskForce;

import java.io.*;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@Slf4j
public class PackageRunner extends BaseRunner {

    public PackageRunner(AgentRuntime runtime, PlatformApi platform) {
        super(runtime, platform);
    }

    private void downloadVariables(Environment environment) {
    }

    private void downloadPackage(TaskForce taskForce) throws IOException {
        Optional<File> robotPackage = this.platform.taskForceApi.getTaskForcePackage(taskForce);
        Path destination = Paths.get(this.runtime.getProjectsDir().toString(), taskForce.getRobot());
        if (robotPackage.isPresent()) {
            ZipUtils.unzip(robotPackage.get().toString(), destination.toString());
        }
    }

    @Override
    public int run(Job job) {
        return -1;
    }

}
