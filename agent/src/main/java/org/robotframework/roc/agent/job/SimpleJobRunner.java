package org.robotframework.roc.agent.job;

import com.github.yusufcanb.micromamba4j.Micromamba;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.robotframework.roc.core.models.Environment;
import org.robotframework.roc.core.models.Job;
import org.robotframework.roc.core.models.TaskForce;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Path;
import java.nio.file.Paths;

@Slf4j
@Component
public class SimpleJobRunner {

    private static final String REPOSITORY_URL = "https://github.com/robocorp/example-rpa-form-challenge/archive/refs/heads/main.zip";
    private static final String MAMBA_EXECUTABLE_URL = "https://micromamba.snakepit.net/api/micromamba/win-64/latest";

    private final RestTemplate restTemplate;

    private Environment environment;
    private TaskForce taskForce;

    private String repoName = "example-rpa-form-challenge";

    @Setter
    private String cmd;

    public SimpleJobRunner(final RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }


    public void run(Long jobId) throws IOException {
        String jobDetailEndpoint = String.format("http://localhost:8080/job/%s", jobId.toString());
        ResponseEntity<Job> response = this.restTemplate.getForEntity(jobDetailEndpoint, Job.class);

        log.debug("<Job {}> fetching done. Return code is: {}", jobId, response.getStatusCode());

        Job job = response.getBody();

        this.environment = job.getEnvironment();
        this.taskForce = job.getTaskForce();

        log.info("<TaskForce {}> will be used", this.taskForce.getId());
        log.debug("<Environment {}> will be used", this.environment.getId());

        Path extractPath = Paths.get(System.getProperty("user.home"), "roc");

//        File file = restTemplate.execute("https://github.com/robocorp/example-rpa-form-challenge/archive/refs/heads/main.zip", HttpMethod.GET, null, clientHttpResponse -> {
//            File ret = File.createTempFile(repoName, ".zip");
//            StreamUtils.copy(clientHttpResponse.getBody(), new FileOutputStream(ret));
//            return ret;
//        });
//
//        log.info("Robot repository downloaded to path: {}", file.getAbsolutePath());
//        ZipUtils.extractZip(file.getAbsolutePath(), extractPath);
//
//        log.info("Downloading micromamba executable for {}", System.getProperty("os.name"));
//        File micromambaArchive = restTemplate.execute(MAMBA_EXECUTABLE_URL, HttpMethod.GET, null, clientHttpResponse -> {
//            File ret = File.createTempFile("micromamba-win64-", ".zip");
//            StreamUtils.copy(clientHttpResponse.getBody(), new FileOutputStream(ret));
//            return ret;
//        });
//        log.info("Micromamba archive downloaded to path: {}", micromambaArchive.getAbsolutePath());
//
//        ZipUtils.extractZip(micromambaArchive.getAbsolutePath(), extractPath);
//        log.info("Micromamba executable copied to {}", extractPath);

        Path mambaBinaryPath = Paths.get(extractPath.toString(), "micromamba");
        Micromamba micromamba = new Micromamba(mambaBinaryPath);
        micromamba.setRootPrefix(Paths.get(System.getProperty("user.home"), ".roc-agent"));
        String virtualEnvironmentId = String.format("task-force-%s", taskForce.getId());

        micromamba.create(virtualEnvironmentId);
        micromamba.setActiveEnvironment(virtualEnvironmentId);
        micromamba.install(new String[]{"python=3.7.9",});

        Runtime runtime = Runtime.getRuntime();
        String cmd;

        cmd = String.format("%s -m pip install -q robotframework rpaframework", micromamba.getPythonInterpreter().getAbsolutePath());
        log.info("Installing project requirements: {}", cmd);
        executeCommand(runtime, cmd);

        cmd = String.format("%s %s", micromamba.getExecutable("robot").getAbsolutePath(), "tasks.robot");
        log.info("Executing command: {}", cmd);
        executeCommand(runtime, cmd);

        log.info("Job processing finished");
    }

    private void executeCommand(Runtime runtime, String cmd) throws IOException {
        Path workingDirectory = Paths.get(System.getProperty("user.home"), "roc", "example-rpa-form-challenge-main");
        Process p2 = runtime.exec(cmd, null, workingDirectory.toFile().getCanonicalFile());
        try {
            p2.waitFor();
            String stdout = IOUtils.toString(p2.getInputStream(), Charset.defaultCharset());
            String stderr = IOUtils.toString(p2.getErrorStream(), Charset.defaultCharset());

            log.info("\n\n\n" + stderr);
        } catch (InterruptedException ex) {
            log.error(ex.getMessage());
        }
    }

}
