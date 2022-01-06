package org.robotframework.roc.core.models;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import org.robotframework.roc.core.beans.OS;

import javax.persistence.*;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Date;

@Data
@Entity(name = "agents")
public class Agent {

    @Id
    @GeneratedValue
    private Long id;
    private String displayName;
    private OS os;

    private String accessKey;
    private String accessSecret;
    private boolean initialized = false;

    private Date lastActive;

    @ManyToOne
    @JoinColumn(columnDefinition = "projectId")
    @Getter(AccessLevel.NONE)
    private Project project;

    public String generateToken() {
        SecureRandom secureRandom = new SecureRandom();
        Base64.Encoder base64Encoder = Base64.getUrlEncoder();

        byte[] randomBytes = new byte[24];
        secureRandom.nextBytes(randomBytes);
        return base64Encoder.encodeToString(randomBytes);
    }

}
