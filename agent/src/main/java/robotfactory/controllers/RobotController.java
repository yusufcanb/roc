package robotfactory.controllers;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RobotController {

    @RequestMapping("/robot")
    public String getRobot() {
        return "I'm Mr. Robotto";
    }
    
}
