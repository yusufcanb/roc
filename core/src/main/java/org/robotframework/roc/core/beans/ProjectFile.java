package org.robotframework.roc.core.beans;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;
import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectFile {

    private String id;
    private ProjectFileType type;
    private String name;
    private String extension;

    private List<ProjectFile> children;
    
    public void setId(String id) {
        this.id = new String(Base64.getEncoder().encode(id.getBytes()), StandardCharsets.UTF_8);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProjectFile that = (ProjectFile) o;
        return name.equals(that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
}
