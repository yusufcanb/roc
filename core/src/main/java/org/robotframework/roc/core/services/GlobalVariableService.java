package org.robotframework.roc.core.services;

import org.robotframework.roc.core.models.GlobalVariable;
import org.robotframework.roc.core.models.Project;

import java.util.Collection;

public interface GlobalVariableService extends CRUDService<Long> {
    void createGlobalVariable(GlobalVariable variable);

    void updateGlobalVariable(Long id, GlobalVariable variable);

    void deleteGlobalVariable(Long id);

    Collection<GlobalVariable> getGlobalVariablesByProject(Project project);

}
