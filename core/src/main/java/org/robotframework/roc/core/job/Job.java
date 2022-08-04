package org.robotframework.roc.core.job;

import lombok.Data;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.util.Date;

@Data
@RedisHash("Job")
public class Job implements Serializable {

    private String id;

    private String projectId;
    private String agentId;
    private String environmentId;
    private String taskForceId;
    
    private String name;
    private JobStatus status;

    private Date createdAt;
    private Date startedAt = null;
    private Date finishedAt = null;

}
