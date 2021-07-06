package org.robotframework.roc.core.models;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;


@Entity(name = "platforms")
@Data
public class Platform {

    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    private Factory factory;

    private String name;
    private String version;
    private String architecture;
    private String pythonVersion;
    private String jvmVersion;

}
