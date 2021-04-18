package tray;

import com.yusufcanb.rpa.core.models.Factory;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ConfigurableApplicationContext;
import robotfactory.RobotFactoryApplication;

public class Application extends Thread {
    ConfigurableApplicationContext ctx;

    @Override
    public void run() {
        ctx = SpringApplication.run(RobotFactoryApplication.class);
    }

    public void exit() {
        SpringApplication.exit(ctx, () -> 0);
    }

}
