package org.robotframework.roc.core.models;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Data
public class TaskForce {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(columnDefinition = "projectId")
    private Project project;

    private String name;

    private String sourceType;
    private String repositoryUrl;

    public String getPackageUrl() {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder
                .append(project.getSlug())
                .append("/")
                .append(this.buildPackageUrl(repositoryUrl));
        return stringBuilder.toString();
    }

    public String getBucketName() {
        return String.valueOf(project.getSlug());
    }

    public String buildPackageUrl(String filename) {
        return String.join("/", "task-force", String.valueOf(id), "packages", filename);
    }
}
