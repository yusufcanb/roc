package org.robotframework.roc.core;

public interface CRUDService<ID> {
    boolean isExists(ID id);
}
