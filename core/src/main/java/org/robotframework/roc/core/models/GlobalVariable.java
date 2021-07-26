package org.robotframework.roc.core.models;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;

import javax.persistence.*;

@Data
@Entity(name = "global_variables")
public class GlobalVariable {

    @Id
    @GeneratedValue
    private Long id;

    private String globalKey;
    private String globalValue;
    private String type;

    private boolean hidden = false;
    private boolean encrypted = false;

    @ManyToOne
    @JoinColumn(columnDefinition = "project_id")
    @Getter(AccessLevel.NONE)
    private Project project;

}
