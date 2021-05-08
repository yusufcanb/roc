package com.yusufcanb.rpa.core.interfaces;

public interface DTO<T, V> {
     V fromModel(T model);
}
