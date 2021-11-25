package org.robotframework.roc.agent.resource;

import org.robotframework.roc.core.models.TaskForce;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Optional;

@Component
public class TaskForceResource extends Resource {

    public Optional<File> getTaskForcePackage(TaskForce taskForce) {
        String url = String.format("http://%s:%s/s3/%s", this.getHost(), this.getPort(), taskForce.getPackageUrl());
        File file = restTemplate.execute(url, HttpMethod.GET, null, clientHttpResponse -> {
            File ret = File.createTempFile(taskForce.getRepositoryUrl(), null);
            StreamUtils.copy(clientHttpResponse.getBody(), new FileOutputStream(ret));
            return ret;
        });

        if (file.exists()) {
            return Optional.of(file);
        } else {
            return Optional.empty();
        }

    }

}
