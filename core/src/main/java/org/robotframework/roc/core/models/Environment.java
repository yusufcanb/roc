package org.robotframework.roc.core.models;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import java.util.Collection;

@Entity
@Data
public class Environment {

    @GeneratedValue
    @Id
    private Long id;

    private String name;
    private String description;

    @OneToMany
    Collection<EnvironmentVariable> variables;

}
