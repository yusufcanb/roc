package org.robotframework.roc.core.models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class TaskForce {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(columnDefinition = "projectId")
    private Project project;

    private String name;

    private String sourceType;
    private String repositoryUrl;

    public String getPackageUrl() {
        return String.join("/",
                "projects",
                String.valueOf(project.getId()),
                "task-force",
                String.valueOf(id),
                "robot.zip");
    }

}
