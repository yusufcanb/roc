package com.yusufcanb.rpa.core.models;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "factories")
@Data
public class Factory {
    @GeneratedValue
    @Id
    private Long id;
    private String displayName;

    @ElementCollection
    private List<String> installedPackages = new ArrayList<>();

    @OneToOne
    private Platform platform;

}
