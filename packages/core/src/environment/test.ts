import 'reflect-metadata';

import {
  Environment,
  EnvironmentCreateDto,
  EnvironmentRetrieveDto,
  EnvironmentUpdateDto,
} from '.';
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
    test('validation(+)', () => {
      const envDto = new EnvironmentCreateDto();
      envDto.id = 'valid-env-name';
      envDto.description = 'hello world!';
      envDto.variables = { hello: 'world!' };

      validate(envDto).then((errors) => {
        expect(errors.length).toEqual(0);
      });
    });

    test('validation(-)', () => {
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

  describe('EnvironmentUpdateDto', () => {
    test('validation(+)', () => {
      const envDto = new EnvironmentUpdateDto();
      envDto.description = 'hello world!';
      envDto.variables = { hello: 'world!' };

      validate(envDto).then((errors) => {
        expect(errors.length).toEqual(0);
      });
    });

    test('validation(-)', () => {
      const envDto = new EnvironmentUpdateDto();
      envDto.variables = { hello: 'world!' };
      validate(envDto).then((errors) => {
        expect(errors.length).toEqual(0);
      });
    });
  });

  describe('EnvironmentRetrieveDto', () => {
    const env = new Environment();

    env.id = 'test-env';
    env.projectId = 'default-project';
    env.description = 'no description';

    test('::fromMany(obj)', () => {
      const dtos = EnvironmentRetrieveDto.fromMany([env]);
      dtos[0].id = env.id;
      dtos[0].projectId = env.projectId;
      dtos[0].description = env.description;
    });

    test('::from(obj)', () => {
      const dto = EnvironmentRetrieveDto.from(env);
      dto.id = env.id;
      dto.projectId = env.projectId;
      dto.description = env.description;
    });

    test('validation(+)', () => {
      const envDto = new EnvironmentRetrieveDto();
      envDto.description = 'hello world!';
      envDto.variables = { hello: 'world!' };

      validate(envDto).then((errors) => {
        expect(errors.length).toEqual(0);
      });
    });

    test('validation(-)', () => {
      const envDto = new EnvironmentRetrieveDto();
      envDto.variables = { hello: 'world!' };
      validate(envDto).then((errors) => {
        expect(errors.length).toEqual(0);
      });
    });
  });
});
