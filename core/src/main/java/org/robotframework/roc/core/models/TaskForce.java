package org.robotframework.roc.core.models;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Data
public class TaskForce {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(columnDefinition = "projectId")
    @Getter(AccessLevel.NONE)
    private Project project;

    private String name;
    private String assignedRobots;

    private String sourceType;
    private String repositoryUrl;
}
