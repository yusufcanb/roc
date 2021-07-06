package org.robotframework.roc.core.models;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Data
public class Robot {

    @Id
    @GeneratedValue
    private Long id;
    private String name;

    private LocalDateTime createdAt;
    private LocalDateTime updateAt;
}
