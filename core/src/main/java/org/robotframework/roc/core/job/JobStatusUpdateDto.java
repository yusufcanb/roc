package org.robotframework.roc.core.job;

import lombok.Data;
import org.robotframework.roc.core.job.JobStatus;

@Data
public class JobStatusUpdateDto {
    private JobStatus jobStatus;
}
