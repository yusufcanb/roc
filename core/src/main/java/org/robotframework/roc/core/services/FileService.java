package org.robotframework.roc.core.services;

import org.robotframework.roc.core.beans.ProjectFile;
import org.robotframework.roc.core.models.Project;

import java.io.IOException;
import java.util.List;

public interface FileService {

    List<ProjectFile> getProjectFiles(Project project) throws IOException;

    String getProjectFileContent(Project project, String fileId) throws IOException;
}
