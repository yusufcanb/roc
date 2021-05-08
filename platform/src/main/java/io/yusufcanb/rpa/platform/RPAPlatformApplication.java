package io.yusufcanb.rpa.platform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan("com.yusufcanb.rpa.core")
public class RPAPlatformApplication {

    public static void main(String[] args) {
        SpringApplication.run(RPAPlatformApplication.class);
    }

}
