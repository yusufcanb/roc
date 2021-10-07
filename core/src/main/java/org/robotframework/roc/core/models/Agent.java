package org.robotframework.roc.core.models;

import lombok.Data;
import org.robotframework.roc.core.beans.OS;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.security.SecureRandom;
import java.util.Base64;

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

    public String generateToken() {
        SecureRandom secureRandom = new SecureRandom();
        Base64.Encoder base64Encoder = Base64.getUrlEncoder();

        byte[] randomBytes = new byte[24];
        secureRandom.nextBytes(randomBytes);
        return base64Encoder.encodeToString(randomBytes);
    }


}
