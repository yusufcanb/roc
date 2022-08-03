package org.robotframework.roc.core.job;

import lombok.Data;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.util.Date;

@Data
@RedisHash("Job")
public class Job implements Serializable {

    private Long id;

    private Long projectId;
    private Long agentId;
    private Long environmentId;
    private Long taskForceId;

    private String name;
    private JobStatus status;

    private Date createdAt;
    private Date startedAt = null;
    private Date finishedAt = null;

}
