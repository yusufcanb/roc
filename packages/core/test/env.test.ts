import { Environment, EnvironmentCreateDto } from "@roc/core";
import {
    validate
} from 'class-validator';

describe('core.environment', () => {

    describe("core.environment.entity.Environment", () => {
        test('it can be construct with no parameters', () => {
            var e = new Environment();
            expect(e).not.toBe(null);
        });
    })

    describe('core.environment.dto.EnvironmentCreateDto', () => {

        test('it validates correctly when given fields are valid', () => {
            let envDto = new EnvironmentCreateDto();
            envDto.name = "valid-env-name";
            envDto.description = "hello world!"
            envDto.yaml = "not null"

            validate(envDto).then(errors => {
                expect(errors.length).toEqual(0);
            });
        });

        test('it has validation errors when given name does not match the name convention', () => {
            let envDto = new EnvironmentCreateDto();
            envDto.name = "valid-env_!! ff";
            envDto.yaml = "not null"
            validate(envDto).then(errors => {
                expect(errors.length).toEqual(1);
                expect(errors[0].constraints.matches).toEqual("name must match /^[a-z0-9-]+$/ regular expression")
            });
        });

    });

});

