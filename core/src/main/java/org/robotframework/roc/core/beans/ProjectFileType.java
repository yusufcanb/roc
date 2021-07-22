package org.robotframework.roc.core.beans;

public enum ProjectFileType {
    DIRECTORY("directory"),
    FILE("file");

    public final String label;

    private ProjectFileType(String label) {
        this.label = label.toLowerCase();
    }
}
