package org.robotframework.roc.core.agent;

import lombok.Data;
import org.springframework.data.redis.core.RedisHash;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@Data
@RedisHash("Agent")
public class Agent implements Serializable {

    private String id;
    private String name;

    private String hostName;
    private String platform;
    private String arch;
    private String version;
    private String dockerVersion;

    private List<String> tags = new LinkedList<>();

    private Date lastSeen;

}
