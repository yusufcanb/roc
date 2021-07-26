package org.robotframework.roc.core.models;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.robotframework.roc.core.utils.Slugifier;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Project {

    @Id
    @GeneratedValue
    private Long id;

    @Column(unique = true)
    private String name;
    private String type;
    private boolean isDefault = false;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
    private Date updatedAt;

    @OneToOne(mappedBy = "project", cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private CodeRepository repository;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<GlobalVariable> globalVariables;

    public String getSlug() {
        return Slugifier.toSlug(this.name);
    }
}