package org.robotframework.roc.platform.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class ApiController {

    @RequestMapping("/health-check")
    public Map<String, Object> healthCheck() {
        Map<String, Object> hashMap = new HashMap<>();

        hashMap.put("ok", true);

        return hashMap;
    }

}
