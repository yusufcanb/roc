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

    @Pattern(regexp = "^[a-z0-9-]+$", flags = Pattern.Flag.UNICODE_CASE)
    private String name;
    private List<String> tags = new LinkedList<>();

}
