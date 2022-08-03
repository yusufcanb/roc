package org.robotframework.roc.core.taskforce;

import lombok.Data;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;

@Data
@RedisHash("TaskForce")
public class TaskForce implements Serializable {

    private String id;
    private Long projectId;

    private String name;
    private String robots;

}
