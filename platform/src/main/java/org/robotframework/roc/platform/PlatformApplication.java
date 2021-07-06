package org.robotframework.roc.platform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
@EntityScan("org.robotframework.roc.core")
public class PlatformApplication {

    public static void main(String[] args) {
        SpringApplication.run(PlatformApplication.class);
    }

}
