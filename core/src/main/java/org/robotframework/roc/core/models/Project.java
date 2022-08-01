package org.robotframework.roc.core.models;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.util.Date;

@Data
@NoArgsConstructor
@RedisHash("Project")
public class Project implements Serializable {

    private Long id;

    private String name;
    private String description;

    private Date createdAt;
    private Date updatedAt;

}
