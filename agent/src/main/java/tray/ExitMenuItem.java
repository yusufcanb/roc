package tray;


import dorkbox.systemTray.MenuItem;

public class ExitMenuItem extends MenuItem {

    public ExitMenuItem() {
        super();
        setText("Quit");
        setCallback((actionEvent) -> {
            System.exit(0);
        });
    }
}
