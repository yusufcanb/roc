package org.robotframework.roc.core.models;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Data
public class Environment {

    @OneToMany
    Collection<EnvironmentVariable> variables;
    @GeneratedValue
    @Id
    private Long id;
    private String name;
    private String description;

    @ManyToOne
    @JoinColumn(columnDefinition = "projectId")
    @Getter(AccessLevel.NONE)
    private Project project;

    public Long getProjectId() {
        return project.getId();
    }
}
