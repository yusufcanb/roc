/*
 *   Copyright (c) 2021-2022 Yusuf Can Bayrak <yusufcanbayrak@gmail.com>
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 *   Contributors:
 *   Yusuf Can Bayrak - initial implementation and documentation.
 *
 */

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
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;


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
                service.createProject(p);
            }
        };
    }

    @Bean
    JedisConnectionFactory jedisConnectionFactory() {
        return new JedisConnectionFactory();
    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate() {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(jedisConnectionFactory());
        return template;
    }

}
