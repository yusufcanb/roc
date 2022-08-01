package org.robotframework.roc.core.models;

import lombok.Data;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;

@Data
@RedisHash("Environment")
public class Environment implements Serializable {

    private Long id;
    private Long projectId;

    private String name;
    private List<String> tags = new LinkedList<>();

}
