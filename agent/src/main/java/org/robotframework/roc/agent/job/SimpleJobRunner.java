package org.robotframework.roc.agent.job;

import lombok.extern.slf4j.Slf4j;
import org.robotframework.roc.agent.AgentRuntime;
import org.robotframework.roc.agent.resource.JobResource;
import org.robotframework.roc.agent.resource.TaskForceResource;
import org.robotframework.roc.agent.utils.ZipUtils;
import org.robotframework.roc.core.models.Job;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;

import java.io.*;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.zip.ZipFile;

@Slf4j
@Component
public class SimpleJobRunner {

    private final AgentRuntime agentRuntime;
    private final TaskForceResource taskForceResource;

    private final Runtime runtime = Runtime.getRuntime();

    public SimpleJobRunner(final AgentRuntime agentRuntime, final JobResource jobResource, final TaskForceResource taskForceResource) {
        this.agentRuntime = agentRuntime;
        this.taskForceResource = taskForceResource;
    }

    private String getProjectByRepositoryURL(String url) {
        String[] path = url.split("/");
        return path[path.length - 1];
    }

    private void pullSource(String binaryPath, String sourceUrl) throws IOException {
        log.info("Executing command: {}", String.join(" ", binaryPath, "pull", sourceUrl));
        ProcessBuilder pb = new ProcessBuilder()
                .command(binaryPath, "pull", sourceUrl)
                .directory(agentRuntime.getProjectsDir().toFile());

        pb.redirectErrorStream(true);

        Process p = pb.start();
        Reader reader = new InputStreamReader(p.getInputStream());
        BufferedReader bf = new BufferedReader(reader);

        String s;
        while ((s = bf.readLine()) != null) {
            System.out.println(s);
        }
    }

    private void executeRobotWithRepositoryUrl(String binaryPath, String repositoryUrl) throws IOException {
        String cmd = String.format("%s run", binaryPath);
        Path cwd = Paths.get(agentRuntime.getProjectsDir().toString(), this.getProjectByRepositoryURL(repositoryUrl) + "-main");

        log.info("Executing command: {}", cmd);
        ProcessBuilder pb = new ProcessBuilder()
                .command(binaryPath, "run")
                .directory(cwd.toFile());

        pb.redirectErrorStream(true);

        Process p = pb.start();
        Reader reader = new InputStreamReader(p.getInputStream());
        BufferedReader bf = new BufferedReader(reader);

        String s;
        while ((s = bf.readLine()) != null) {
            System.out.println(s);
        }

        log.info("Execution finished");
        if (p.exitValue() == 0) {
            log.error("Robot execution success.");
        } else {
            log.error("Robot execution finished with return code: {}", p.exitValue());
        }
    }

    private void executeRobotWithPackage(String binaryPath, String packageName) throws IOException {
        String cmd = String.format("%s run", binaryPath);
        Path cwd = Paths.get(agentRuntime.getProjectsDir().toString(), packageName);

        log.info("Executing command: {}", cmd);
        ProcessBuilder pb = new ProcessBuilder()
                .command(binaryPath, "run")
                .directory(cwd.toFile());

        pb.redirectErrorStream(true);

        Process p = pb.start();
        Reader reader = new InputStreamReader(p.getInputStream());
        BufferedReader bf = new BufferedReader(reader);

        String s;
        while ((s = bf.readLine()) != null) {
            System.out.println(s);
        }

        log.info("Execution finished");
        if (p.exitValue() == 0) {
            log.info("Robot execution success.");
        } else {
            log.error("Robot execution finished with return code: {}", p.exitValue());
        }
    }

    private void downloadPackage(Long taskForceId) throws IOException {
        Optional<File> robotPackage = this.taskForceResource.getTaskForcePackage(taskForceId);
        Path destination = Paths.get(agentRuntime.getProjectsDir().toString(), String.format("task-force-package-%s", taskForceId));
        if (robotPackage.isPresent()) {
            ZipUtils.unzip(robotPackage.get().toString(), destination.toString());
        }
    }

    public void run(Job job) throws IOException {
        String agentBinary = agentRuntime.getAgentBinary().toString();
        String repositoryUrl = job.getTaskForce().getRepositoryUrl();
        String sourceType = job.getTaskForce().getSourceType();

        if (sourceType.equals("repository")) {
            this.pullSource(agentBinary, repositoryUrl);
            this.executeRobotWithRepositoryUrl(agentBinary, repositoryUrl);
        }
        if (sourceType.equals("package")) {
            Long taskForceId = job.getTaskForce().getId();
            this.downloadPackage(taskForceId);
            this.executeRobotWithPackage(agentBinary, String.format("task-force-package-%s", taskForceId));
        }
    }

}
