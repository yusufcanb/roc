package org.robotframework.roc.platform.factory.controllers;

import org.robotframework.roc.core.models.Factory;
import org.robotframework.roc.core.services.FactoryService;
import org.robotframework.roc.core.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
public class FactoryController {

    final
    FactoryService factoryService;

    final
    ProjectService projectService;

    public FactoryController(FactoryService factoryService, ProjectService projectService) {
        this.factoryService = factoryService;
        this.projectService = projectService;
    }

    @RequestMapping(value = "/factory", method = RequestMethod.GET, params = {"projectId"})
    public ResponseEntity<Collection<Factory>> getFactories(@RequestParam String projectId) {
        Long id = Long.valueOf(projectId);
        if (projectService.isExists(id)) {
            return new ResponseEntity<>(factoryService.getAllFactoriesByProject(id), HttpStatus.OK);
        } else
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @RequestMapping(value = "/factory", method = RequestMethod.POST)
    public ResponseEntity<Long> createNewFactory(@RequestBody Factory factory) {
        Long created = factoryService.createFactory(factory);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
}
