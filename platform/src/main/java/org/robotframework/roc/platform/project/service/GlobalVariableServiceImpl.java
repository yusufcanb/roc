package org.robotframework.roc.platform.project.service;

import org.robotframework.roc.core.models.GlobalVariable;
import org.robotframework.roc.core.models.Project;
import org.robotframework.roc.core.services.GlobalVariableService;
import org.robotframework.roc.platform.project.repository.GlobalVariableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class GlobalVariableServiceImpl implements GlobalVariableService {

    @Autowired
    GlobalVariableRepository globalsRepository;

    @Override
    public void createGlobalVariable(GlobalVariable variable) {

    }

    @Override
    public void updateGlobalVariable(Long id, GlobalVariable variable) {

    }

    @Override
    public void deleteGlobalVariable(Long id) {

    }

    @Override
    public Collection<Project> getGlobalVariablesByProject(Long projectId) {
        return null;
    }

    @Override
    public boolean isExists(Long id) {
        return globalsRepository.existsById(id);
    }
}
