package org.robotframework.roc.platform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;


@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
@EntityScan("org.robotframework.roc.*")
@ComponentScan("org.robotframework.roc.*")
public class PlatformApplication {
    public static void main(String[] args) {
        SpringApplication.run(PlatformApplication.class);
    }
}
