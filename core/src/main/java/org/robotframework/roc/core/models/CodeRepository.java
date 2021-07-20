package org.robotframework.roc.core.models;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.lib.Constants;
import org.eclipse.jgit.lib.Ref;

import javax.persistence.*;
import java.io.File;
import java.io.IOException;

@Entity
@Data
public class CodeRepository {

    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn
    @Getter(AccessLevel.NONE)
    private Project project;

    private String path;

    public static Git asGit(String path) {
        try {
            return Git.open(new File(path));
        } catch (IOException e) {
            return null;
        }
    }

    public boolean getIsInitialized() {
        try {
            Ref headRef = CodeRepository.asGit(path).getRepository().getRef(Constants.HEAD);
            if (headRef == null || headRef.getObjectId() == null) {
                return false;
            } else {
                return true;
            }
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

}
