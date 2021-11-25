package org.robotframework.roc.core.dto.job;

import lombok.Data;
import org.robotframework.roc.core.beans.JobStatus;

@Data
public class JobStatusUpdateDto {
    private JobStatus jobStatus;
}
