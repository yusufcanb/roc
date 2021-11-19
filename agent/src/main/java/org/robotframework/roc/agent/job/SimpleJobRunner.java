package org.robotframework.roc.agent.job;

import lombok.extern.slf4j.Slf4j;
import org.robotframework.roc.agent.AgentRuntime;
import org.robotframework.roc.agent.resource.JobResource;
import org.robotframework.roc.agent.resource.TaskForceResource;
import org.robotframework.roc.agent.utils.ZipUtils;
import org.robotframework.roc.core.beans.JobStatus;
import org.robotframework.roc.core.models.Job;
import org.robotframework.roc.core.models.TaskForce;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.*;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@Slf4j
@Component
public class SimpleJobRunner {

    @Autowired
    private AgentRuntime agentRuntime;

    @Autowired
    private RestTemplate restTemplate;

    private final JobResource jobResource;
    private final TaskForceResource taskForceResource;


    public SimpleJobRunner(final JobResource jobResource,
                           final TaskForceResource taskForceResource) {
        this.taskForceResource = taskForceResource;
        this.jobResource = jobResource;
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

    private int executeRobotWithRepositoryUrl(String binaryPath, String repositoryUrl) throws IOException {
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
            log.info(s);
        }

        log.info("Execution finished");
        if (p.exitValue() == 0) {
            log.error("Robot execution success.");
        } else {
            log.error("Robot execution finished with return code: {}", p.exitValue());
        }
        return p.exitValue();
    }

    private int executeRobotWithPackage(String binaryPath, String packageName) throws IOException {
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
            log.info(s);
        }

        log.info("Execution finished");
        if (p.exitValue() == 0) {
            log.info("Robot execution success.");
        } else {
            log.error("Robot execution finished with return code: {}", p.exitValue());
        }
        return p.exitValue();
    }

    private void downloadPackage(TaskForce taskForce) throws IOException {
        Optional<File> robotPackage = this.taskForceResource.getTaskForcePackage(taskForce);
        Path destination = Paths.get(agentRuntime.getProjectsDir().toString(), taskForce.getRepositoryUrl());
        if (robotPackage.isPresent()) {
            ZipUtils.unzip(robotPackage.get().toString(), destination.toString());
        }
    }

    private void uploadExecutionReport(Job job) {
        HttpHeaders headers = new org.springframework.http.HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        Path reportPath = Paths.get(agentRuntime.getAgentHome().toString(), "projects", job.getTaskForce().getRepositoryUrl(), "output", "log.html");
        body.add("file", new FileSystemResource(reportPath));

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        String url = String.format("http://localhost:8080/job/%s/report", job.getId());
        restTemplate.postForEntity(url, requestEntity, String.class);
    }

    public void run(Job job) throws IOException {
        String agentBinary = agentRuntime.getAgentBinary().toString();
        String repositoryUrl = job.getTaskForce().getRepositoryUrl();
        String sourceType = job.getTaskForce().getSourceType();

        this.jobResource.updateJobStatus(job.getId(), JobStatus.RUN);

        int returnCode;
        if (sourceType.equals("repository")) {
            this.pullSource(agentBinary, repositoryUrl);
            returnCode = this.executeRobotWithRepositoryUrl(agentBinary, repositoryUrl);
            if (returnCode == 0) {
                this.jobResource.updateJobStatus(job.getId(), JobStatus.SUCCESS);
            } else {
                this.jobResource.updateJobStatus(job.getId(), JobStatus.FAIL);
            }
        }
        if (sourceType.equals("package")) {
            TaskForce taskForce = job.getTaskForce();
            this.downloadPackage(taskForce);
            returnCode = this.executeRobotWithPackage(agentBinary, taskForce.getRepositoryUrl());
            if (returnCode == 0) {
                this.jobResource.updateJobStatus(job.getId(), JobStatus.SUCCESS);
            } else {
                this.jobResource.updateJobStatus(job.getId(), JobStatus.FAIL);
            }
        }
        this.uploadExecutionReport(job);
    }

    public void run(Long jobId) throws Exception {
        Optional<Job> job = jobResource.getJobById(jobId);
        if (job.isPresent()) {
            this.run(job.get());
        }
    }

}
