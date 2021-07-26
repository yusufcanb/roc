package org.robotframework.roc.platform.factory.services;

import org.robotframework.roc.core.models.Factory;
import org.robotframework.roc.core.services.FactoryService;
import org.robotframework.roc.platform.factory.repositories.FactoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Collection;

@Service
public class FactoryServiceImpl implements FactoryService {

    @Autowired
    FactoryRepository factoryRepository;

    @Override
    public Long createFactory(Factory factory) {
        this.generateAccessTokens(factory);
        return factoryRepository.save(factory).getId();
    }

    @Override
    public void updateFactory(Long id, Factory factory) {
        if (factoryRepository.existsById(id)) {
            factory.setId(id);
            factoryRepository.save(factory);
        }
    }

    @Override
    public void deleteFactory(Long id) {
        factoryRepository.deleteById(id);
    }

    @Override
    public Collection<Factory> getAllFactoriesByProject(Long projectId) {
        return factoryRepository.findAll();
    }

    @Override
    public void generateAccessTokens(Factory factory) {
        SecureRandom secureRandom = new SecureRandom();
        Base64.Encoder base64Encoder = Base64.getUrlEncoder();

        byte[] randomBytes = new byte[24];
        secureRandom.nextBytes(randomBytes);
        factory.setAccessKey(base64Encoder.encodeToString(randomBytes));

        secureRandom.nextBytes(randomBytes);
        factory.setAccessSecret(base64Encoder.encodeToString(randomBytes));
    }

    @Override
    public boolean isExists(Long id) {
        return factoryRepository.existsById(id);
    }
}
