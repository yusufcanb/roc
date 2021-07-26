package org.robotframework.roc.core.models;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Data
public class EnvironmentVariable {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String value;

    private boolean hidden = false;
    private boolean encrypted = false;

    @ManyToOne
    @JoinColumn(columnDefinition = "environment_id")
    @Getter(AccessLevel.NONE)
    private Environment environment;
}
