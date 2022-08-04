package org.robotframework.roc.core.taskforce;

import lombok.Data;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@Data
@RedisHash("TaskForce")
public class TaskForce implements Serializable {

    private String id;

    private String projectId;
    private String name;
    private String description;

    private List<String> tags;

    private String pkg;

    private Date createdAt;
    private Date updatedAt;

}
