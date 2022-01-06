package org.robotframework.roc.agent.ws;

import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.robotframework.roc.agent.job.JobRunner;
import org.robotframework.roc.agent.job.PackageRunner;
import org.robotframework.roc.agent.job.RepositoryRunner;
import org.robotframework.roc.agent.resource.JobResource;
import org.robotframework.roc.core.dto.stomp.StompPayload;
import org.robotframework.roc.core.models.Job;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.web.client.RestTemplate;

@Slf4j
public class StompFrameHandler {

    final
    JobResource jobResource = new JobResource();

    final
    RestTemplate restTemplate = new RestTemplate();

    private JobRunner getRunnerByRobotType(String robot) {
        if (robot.startsWith("s3://")) {
            return new PackageRunner();
        } else {
            return new RepositoryRunner();
        }
    }

    public void handle(StompHeaders headers, Object payload) {
        Gson gson = new Gson();
        StompPayload message = gson.fromJson(payload.toString(), StompPayload.class);
        ResponseEntity<Job> response = this.restTemplate.getForEntity(String.format("http://localhost:8000/api/v1/job/%s", message.getJobId()), Job.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            try {
                log.info("Job executed {}", message.getJobId());
                JobRunner jobRunner = this.getRunnerByRobotType(response.getBody().getTaskForce().getRobot());
                jobRunner.run(response.getBody());
            } catch (Exception exception) {
                exception.printStackTrace();
            }
        } else {
            log.warn("Job does not exists.");
        }
    }

}
