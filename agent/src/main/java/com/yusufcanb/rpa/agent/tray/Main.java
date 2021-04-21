package com.yusufcanb.rpa.agent.tray;

import dorkbox.systemTray.Menu;
import dorkbox.systemTray.MenuItem;
import dorkbox.systemTray.SystemTray;

public class Main {
    private static final String TRAY_ICON = new TrayIconFile().getAbsolutePath();
    private static final MenuItem[] MENU_ITEMS = {new LaucherMenuItem(), new ExitMenuItem()};

    public static void main(String[] args) {
        SystemTray systemTray = SystemTray.get();
        if (systemTray == null) {
            throw new RuntimeException("Unable to load SystemTray!");
        }
        systemTray.setImage(TRAY_ICON);
        systemTray.setStatus("Port: 8270");
        Menu menu = systemTray.getMenu();
        for (MenuItem item : MENU_ITEMS) {
            menu.add(item);
        }
    }
}
