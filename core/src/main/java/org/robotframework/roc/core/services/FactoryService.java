package org.robotframework.roc.core.services;

import org.robotframework.roc.core.models.Factory;

import java.util.Collection;

public interface FactoryService extends CRUDService<Long> {
    Long createFactory(Factory factory);

    void updateFactory(Long id, Factory factory);

    void deleteFactory(Long id);

    Collection<Factory> getAllFactoriesByProject(Long projectId);

    public void generateAccessTokens(Factory factory);
}
