package com.yusufcanb.rpa.agent.tray;

import com.yusufcanb.rpa.agent.factory.RobotFactoryApplication;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ConfigurableApplicationContext;

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
