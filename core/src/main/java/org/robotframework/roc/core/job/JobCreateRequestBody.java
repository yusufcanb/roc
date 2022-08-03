package org.robotframework.roc.core.job;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.sql.Date;

@Data
public class JobCreateRequestBody {
    String name;
    Date scheduledAt;

    @NotNull
    Long agentId;

    @NotNull
    String taskForceId;

    @NotNull
    Long environmentId;

}
