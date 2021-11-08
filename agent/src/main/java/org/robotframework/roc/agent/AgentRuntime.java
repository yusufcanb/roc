package org.robotframework.roc.agent;

import lombok.Getter;
import lombok.Setter;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Component;
import picocli.CommandLine;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Component
public class AgentRuntime {

    @Getter
    @Setter
    private AgentParameters parameters;

    @Getter
    @Setter
    private Path agentHome = Paths.get(System.getProperty("user.home"), ".roc");

    @Getter
    @Setter
    private Path projectsDir = Paths.get(agentHome.toString(), "projects");

    @Getter
    @Setter
    private Path agentBinary = Paths.get(agentHome.toString(), "rcc.exe");

    private File[] directories = {
            projectsDir.toFile(),
    };

    public AgentRuntime() {
        this.parameters = new AgentParameters();
    }

    public void initRuntime(String[] args) throws IOException {
        CommandLine cli = new CommandLine(this.parameters);
        cli.parseArgs(args);

        if (!agentHome.toFile().exists()) {
            FileUtils.forceMkdir(agentHome.toFile());
        }

        if (!agentBinary.toFile().exists()) {
            copyAgentBinary();
        }

        for (File d : directories) {
            FileUtils.forceMkdir(d);
        }
    }

    public void copyAgentBinary() throws IOException {
        InputStream src = getClass().getResourceAsStream("/bin/rcc-win32.exe");
        Files.copy(src, agentBinary, StandardCopyOption.REPLACE_EXISTING);
    }

}
