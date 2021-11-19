package org.robotframework.roc.platform.s3;

import io.minio.MinioClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MinioConfig {

    @Value("${roc.platform.s3.host}")
    private String host = "localhost";

    @Value("${roc.platform.s3.port}")
    private Integer port = 9000;

    @Value("${roc.platform.s3.user}")
    private String user;

    @Value("${roc.platform.s3.password}")
    private String password;

    @Bean
    MinioClient minioClient() {
        return MinioClient.builder()
                .endpoint(String.format("http://%s:%s", host, port))
                .credentials(user, password)
                .build();
    }

}
