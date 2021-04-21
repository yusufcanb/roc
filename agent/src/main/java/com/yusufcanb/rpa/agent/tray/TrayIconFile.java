package com.yusufcanb.rpa.agent.tray;

import java.io.File;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Paths;

public class TrayIconFile {
    private String absolutePath;

    public TrayIconFile() {
        URL res = getClass().getClassLoader().getResource("tray-icon.png");
        File file = null;
        try {
            file = Paths.get(res.toURI()).toFile();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        absolutePath = file.getAbsolutePath();
    }

    public String getAbsolutePath() {
        return absolutePath;
    }

}
