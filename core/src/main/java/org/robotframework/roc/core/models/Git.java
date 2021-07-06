package org.robotframework.roc.core.models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Git {
    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn
    private Project project;
    private String path;
}
