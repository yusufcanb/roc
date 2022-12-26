import 'reflect-metadata';

import { Environment, EnvironmentCreateDto } from '.';
import { validate } from 'class-validator';

describe('core.environment', () => {
  describe('Environment', () => {
    test('::constructor()', () => {
      const e = new Environment();
      expect(e).not.toBe(null);
    });
    test('::fromPlainObject()', () => {
      const plainObject = {
        id: 'test-env',
        description: 'a test env to test env',
        tags: [],
        variables: {},
      };
      const environment = Environment.fromPlainObject(plainObject);

      expect(environment).not.toBe(null);
      expect(environment).toBeInstanceOf(Environment);

      expect(environment.id).toBe(plainObject.id);
      expect(environment.description).toBe(plainObject.description);

      expect(environment.tags).toStrictEqual([]);
      expect(environment.variables).toStrictEqual({});
    });
  });

  describe('EnvironmentCreateDto', () => {
    test('it validates correctly when given fields are valid', () => {
      const envDto = new EnvironmentCreateDto();
      envDto.id = 'valid-env-name';
      envDto.description = 'hello world!';
      envDto.variables = { hello: 'world!' };

      validate(envDto).then((errors) => {
        expect(errors.length).toEqual(0);
      });
    });

    test('it has validation errors when given name does not match the name convention', () => {
      const envDto = new EnvironmentCreateDto();
      envDto.id = 'valid-env_!! ff';
      envDto.variables = { hello: 'world!' };
      validate(envDto).then((errors) => {
        expect(errors.length).toEqual(1);
        expect(errors[0].constraints.matches).toEqual(
          'id must match /^[a-z0-9-]+$/ regular expression',
        );
      });
    });
  });
});
