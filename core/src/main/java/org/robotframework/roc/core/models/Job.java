package org.robotframework.roc.core.models;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import org.robotframework.roc.core.beans.JobStatus;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
public class Job {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(columnDefinition = "projectId")
    @Getter(AccessLevel.NONE)
    private Project project;
    private String name;
    private JobStatus status;

    @ManyToOne
    private Agent agent;

    @ManyToOne
    private Environment environment;

    @ManyToOne
    private TaskForce taskForce;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    private Date scheduledAt;

    @Temporal(TemporalType.TIMESTAMP)
    private Date startedAt = null;

    @Temporal(TemporalType.TIMESTAMP)
    private Date finishedAt = null;

    public String getReportPath() {
        return "/projects/" + project.getId() + "/job/" + id + "/report.html";
    }

}
