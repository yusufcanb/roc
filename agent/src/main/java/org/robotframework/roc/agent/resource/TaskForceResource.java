package org.robotframework.roc.agent.resource;

import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Optional;

@Component
public class TaskForceResource extends Resource {

    public Optional<File> getTaskForcePackage(Long taskForceId) {
        String url = String.format("http://%s:%s/task-force/%s/download", this.host, this.port, taskForceId);
        File file = restTemplate.execute(url, HttpMethod.GET, null, clientHttpResponse -> {
            String packageName = String.format("task-force-%s-package", taskForceId);
            File ret = File.createTempFile(packageName, ".zip");
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
