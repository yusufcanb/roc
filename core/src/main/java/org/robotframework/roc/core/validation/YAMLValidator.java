package org.robotframework.roc.core.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class YAMLValidator implements ConstraintValidator<YAMLConstraint, String> {

    @Override
    public void initialize(YAMLConstraint yaml) {
    }

    @Override
    public boolean isValid(String yamlField, ConstraintValidatorContext cxt) {
        return true;
    }

}