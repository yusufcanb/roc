package com.yusufcanb.rpa.agent.robotfactory.controllers;


import com.yusufcanb.rpa.core.models.Robot;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RobotController {

    @RequestMapping("/robot")
    public Robot getRobot() {
        Robot r = new Robot();
        r.setId(1L);
        return r;
    }
    
}
