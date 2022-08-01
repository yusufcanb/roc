package org.robotframework.roc.core.models;

import lombok.Data;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@RedisHash("Agent")
public class Agent implements Serializable {

    private Long id;
    private String name;

    private String hostName;
    private String platform;
    private String version;
    private String dockerVersion;

    private List<String> tags;

    private Date lastSeen;

}
