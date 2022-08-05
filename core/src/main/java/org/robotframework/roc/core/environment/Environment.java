package org.robotframework.roc.core.environment;

import lombok.Data;
import org.springframework.data.redis.core.RedisHash;

import javax.validation.constraints.Pattern;
import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;

@Data
@RedisHash("Environment")
public class Environment implements Serializable {

    private String id;
    private String projectId;

    private String name;

    private String description;
    private List<String> tags = new LinkedList<>();

}
