package org.robotframework.roc.core.models;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;

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
    private String status;

    @ManyToOne
    private Environment environment;

    @ManyToOne
    private Agent agent;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    private Date startedAt = null;

    @Temporal(TemporalType.TIMESTAMP)
    private Date finishedAt = null;
}
