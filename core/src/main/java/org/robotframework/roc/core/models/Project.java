package org.robotframework.roc.core.models;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
public class Project {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String type;
    private boolean isDefault = false;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @OneToOne(mappedBy = "project", cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private Git git;

}