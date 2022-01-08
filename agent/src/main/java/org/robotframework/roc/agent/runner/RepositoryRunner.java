package org.robotframework.roc.agent.runner;

import lombok.extern.slf4j.Slf4j;
import org.robotframework.roc.agent.AgentRuntime;
import org.robotframework.roc.agent.api.PlatformApi;
import org.robotframework.roc.core.beans.JobStatus;
import org.robotframework.roc.core.models.Job;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.file.Path;
import java.nio.file.Paths;

@Slf4j
public class RepositoryRunner extends BaseRunner {


    public RepositoryRunner(AgentRuntime runtime, PlatformApi platform) {
        super(runtime, platform);
    }

    private void pullSource(String binaryPath, String sourceUrl) throws IOException {
        log.info("Executing command: {}", String.join(" ", binaryPath, "pull", sourceUrl.replace("https://", "")));
        ProcessBuilder pb = new ProcessBuilder()
                .command(binaryPath, "pull", sourceUrl.replace("https://", ""))
                .directory(runtime.getProjectsDir().toFile());

        pb.redirectErrorStream(true);

        Process p = pb.start();
        Reader reader = new InputStreamReader(p.getInputStream());
        BufferedReader bf = new BufferedReader(reader);

        String s;
        while ((s = bf.readLine()) != null) {
            System.out.println(s);
        }
    }

    private String getProjectByRepositoryURL(String url) {
        String[] path = url.split("/");
        return path[path.length - 1];
    }

    private Path getWorkingDirectoryByRobot(String robot) {
        return Paths.get(runtime.getProjectsDir().toString(), this.getProjectByRepositoryURL(robot) + "-master");
    }

    @Override
    public int run(Job job) {
        log.info("Repository runner {}", job.getId());

        String agentBinary = runtime.getAgentBinary().toString();
        String robotUrl = job.getTaskForce().getRobot();

        try {
            this.pullSource(agentBinary, robotUrl);
        } catch (IOException exception) {
            exception.printStackTrace();
        }

        this.platform.jobApi.updateJobStatus(job.getId(), JobStatus.RUN);

        String cmd = String.format("%s run", agentBinary);
        Path cwd = this.getWorkingDirectoryByRobot(job.getTaskForce().getRobot());

        log.info("Executing command: {}", cmd);
        ProcessBuilder pb = new ProcessBuilder()
                .command(agentBinary, "run")
                .directory(cwd.toFile());

        pb.redirectErrorStream(true);

        Process p = null;
        try {
            p = pb.start();
            Reader reader = new InputStreamReader(p.getInputStream());
            BufferedReader bf = new BufferedReader(reader);

            String s;
            while ((s = bf.readLine()) != null) {
                log.info(s);
            }

            log.info("Execution finished with return value: {}", p.exitValue());
            if (p.exitValue() == 0) {
                this.platform.jobApi.uploadJobReport(job.getId(), this.getWorkingDirectoryByRobot(job.getTaskForce().getRobot()));
                this.platform.jobApi.updateJobStatus(job.getId(), JobStatus.SUCCESS);
                log.info("Robot execution success.");
            } else {
                this.platform.jobApi.uploadJobReport(job.getId(), this.getWorkingDirectoryByRobot(job.getTaskForce().getRobot()));
                this.platform.jobApi.updateJobStatus(job.getId(), JobStatus.FAIL);
                log.error("Robot execution finished with return code: {}", p.exitValue());
            }
            return p.exitValue();
        } catch (IOException exception) {
            exception.printStackTrace();
            return -255;
        }
    }

}
