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
