package org.robotframework.roc.core.job;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.sql.Date;

@Data
public class JobCreateRequestBody {

    @NotNull
    String agentId;

    @NotNull
    String taskForceId;

    @NotNull
    String environmentId;

    Date scheduledAt;
}
