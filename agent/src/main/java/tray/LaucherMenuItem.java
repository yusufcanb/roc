package tray;

import dorkbox.systemTray.MenuItem;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class LaucherMenuItem extends MenuItem {
    private Logger log = LoggerFactory.getLogger(LaucherMenuItem.class);

    private Thread applicationThread = new Application();
    private boolean isRunning = false;

    public LaucherMenuItem() {
        super("Start Application");
        setCallback((event) -> {
            if (!isRunning) {
                this.applicationThread = new Application();
                this.applicationThread.start();
                setText("Stop Application");
                isRunning = true;
            } else {
                Application app = (Application) this.applicationThread;
                app.exit();
                log.info("Application stopped.");
                setText("Start Application");
                isRunning = false;
            }
        });
    }
}
