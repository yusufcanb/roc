package org.robotframework.roc.agent.utils;

import org.apache.commons.compress.archivers.ArchiveEntry;
import org.apache.commons.compress.archivers.ArchiveException;
import org.apache.commons.compress.archivers.ArchiveInputStream;
import org.apache.commons.compress.archivers.ArchiveStreamFactory;
import org.apache.commons.io.IOUtils;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

public abstract class ZipUtils {

    public static void extractZip(String zipFilePath, Path extractDirectory) {
        InputStream inputStream = null;
        try {
            Path filePath = Paths.get(zipFilePath);
            inputStream = Files.newInputStream(filePath);
            ArchiveStreamFactory archiveStreamFactory = new ArchiveStreamFactory();
            ArchiveInputStream archiveInputStream = archiveStreamFactory.createArchiveInputStream(ArchiveStreamFactory.ZIP, inputStream);
            ArchiveEntry archiveEntry = null;
            while ((archiveEntry = archiveInputStream.getNextEntry()) != null) {
                Path path = Paths.get(extractDirectory.toString(), archiveEntry.getName());
                File file = path.toFile();
                if (archiveEntry.isDirectory()) {
                    if (!file.isDirectory()) {
                        file.mkdirs();
                    }
                } else {
                    File parent = file.getParentFile();
                    if (!parent.isDirectory()) {
                        parent.mkdirs();
                    }
                    try (OutputStream outputStream = Files.newOutputStream(path)) {
                        IOUtils.copy(archiveInputStream, outputStream);
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ArchiveException e) {
            e.printStackTrace();
        }
    }

    public static void copyResource(String res, String dest, Class c) throws IOException {
        InputStream src = c.getResourceAsStream(res);
        Files.copy(src, Paths.get(dest), StandardCopyOption.REPLACE_EXISTING);
    }

}
