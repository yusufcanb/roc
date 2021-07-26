package org.robotframework.roc.core.services;

public interface CRUDService<ID> {
    boolean isExists(ID id);
}
