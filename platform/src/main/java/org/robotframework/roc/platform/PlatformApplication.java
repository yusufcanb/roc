package org.robotframework.roc.platform;

import lombok.extern.slf4j.Slf4j;
import org.robotframework.roc.core.models.Project;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

import org.robotframework.roc.core.services.ProjectService;


@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
@EntityScan("org.robotframework.roc.*")
@ComponentScan("org.robotframework.roc.*")
@Slf4j
public class PlatformApplication {
    public static void main(String[] args) {
        SpringApplication.run(PlatformApplication.class);
    }


    @Bean
    CommandLineRunner commandLineRunner(ApplicationContext ctx) {
        return (String[] args) -> {
            ProjectService service = ctx.getBean(ProjectService.class);
            if (!(service.getProjects().size() > 0)) {
                log.info("No project exists.. creating a default project");
                Project p = new Project();
                p.setName("Default Project");
                p.setDefault(true);
                service.createProject(p);
            }
        };
    }

}
