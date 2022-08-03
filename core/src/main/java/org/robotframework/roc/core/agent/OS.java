package org.robotframework.roc.core.agent;

public enum OS {
    Windows("windows"),
    MacOS("macos"),
    Linux("linux");

    public final String label;

    private OS(String label) {
        this.label = label.toLowerCase();
    }
}
