package org.robotframework.roc.core.models;

import lombok.Data;
import org.eclipse.jgit.api.Git;

import javax.persistence.*;

@Entity
@Data
public class CodeRepository {
    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn
    private Project project;
    private String path;


    public static Git asGit(String path) throws Exception {
        throw new Exception("Not implemented");
    }
}
