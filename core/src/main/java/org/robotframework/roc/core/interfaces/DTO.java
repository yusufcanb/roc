package org.robotframework.roc.core.interfaces;

public interface DTO<T, V> {
     V fromModel(T model);
}
