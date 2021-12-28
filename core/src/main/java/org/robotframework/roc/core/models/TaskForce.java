package org.robotframework.roc.core.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
public class TaskForce {

    @Id
    @GeneratedValue
    @Getter
    @Setter
    private Long id;

    @ManyToOne
    @JoinColumn(columnDefinition = "projectId")
    @Getter
    @Setter
    private Project project;

    @Getter
    @Setter
    private String name;

    @Getter
    @Setter
    private String robot;

    public String getPackageUrl() {
        return String.join("/",
                "projects",
                String.valueOf(project.getId()),
                "task-force",
                String.valueOf(id),
                "robot.zip");
    }

}
