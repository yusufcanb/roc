import { validate } from 'class-validator';
import { Project, ProjectCreateDto, ProjectRetrieveDto } from '.';

describe('core.project', () => {
  describe('Project', () => {
    test('::constructor()', () => {
      const project = new Project();
      expect(project).not.toBe(null);

      project.createdAt = 'Thu Nov 24 2022 23:07:17 GMT+0100';
      project.updatedAt = 'Thu Nov 24 2022 23:07:17 GMT+0100';

      expect(project.createdAt).toBeInstanceOf(Date);
      expect(project.updatedAt).toBeInstanceOf(Date);

      expect(project.updatedAt).toStrictEqual(
        new Date('Thu Nov 24 2022 23:07:17 GMT+0100'),
      );
      expect(project.updatedAt).toStrictEqual(
        new Date('Thu Nov 24 2022 23:07:17 GMT+0100'),
      );
    });

    test('::fromPlainObject()', () => {
      const plainObject = {
        id: 'test-env',
        description: 'a test env to test env',
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: ['dev', 'ui'],
      };
      const project = Project.fromPlainObject(plainObject);

      expect(project).not.toBe(null);
      expect(project).toBeInstanceOf(Project);

      expect(project.id).toBe(plainObject.id);

      expect(project.createdAt).not.toBeNull();
      expect(project.createdAt).toBeInstanceOf(Date);

      expect(project.tags).toStrictEqual(plainObject.tags);
    });

    test('::toPlainObject()', () => {
      const project = new Project();
      project.id = 'hello-world';
      project.tags = ['dev', 'test'];
      project.createdAt = new Date();
      project.updatedAt = new Date();

      const plainObject = Project.toPlainObject(project);

      expect(project.id).toBe(plainObject.id);
      expect(project.createdAt).toStrictEqual(plainObject.createdAt);
      expect(project.updatedAt).toStrictEqual(plainObject.updatedAt);
      expect(project.tags).toStrictEqual(plainObject.tags);
    });
  });

  describe('ProjectRetrieveDto', () => {
    test('::constructor()', () => {
      const projectDto = new ProjectRetrieveDto();
      expect(projectDto).not.toBe(null);
    });

    test('::from(obj)', () => {
      const project = new Project();

      project.id = 'default-project';
      project.description = 'test description';
      project.createdAt = 'Thu Nov 24 2022 23:07:17 GMT+0100';
      project.updatedAt = 'Thu Nov 24 2022 23:07:17 GMT+0100';

      const projectDto = ProjectRetrieveDto.from(project);

      expect(projectDto).not.toBe(null);
      expect(projectDto.id).toBe(project.id);
      expect(projectDto.description).toBe(project.description);
      expect(projectDto.createdAt).toBe(project.createdAt);
      expect(projectDto.updatedAt).toBe(project.updatedAt);
    });
  });

  describe('ProjectCreateDto', () => {
    test('::constructor()', () => {
      const createDto = new ProjectCreateDto();
      expect(createDto).not.toBe(null);
    });

    test('validation(+)', () => {
      const projectCreateDto = new ProjectCreateDto();
      projectCreateDto.id = 'default-project';
      projectCreateDto.description = 'hello world!';
      projectCreateDto.tags = ['default'];

      validate(projectCreateDto).then((errors) => {
        expect(errors.length).toEqual(0);
      });
    });

    test('validation(-)', () => {
      const projectCreateDto = new ProjectCreateDto();
      projectCreateDto.id = 'valid-env_!! ff';

      validate(projectCreateDto).then((errors) => {
        expect(errors.length).toEqual(3);
        expect(errors[0].constraints.matches).toEqual(
          'id must match /^[a-z0-9-]+$/ regular expression',
        );
        expect(errors[1].constraints.isDefined).toEqual(
          'description should not be null or undefined',
        );
        expect(errors[2].constraints.isDefined).toEqual(
          'tags should not be null or undefined',
        );
      });
    });
  });
});
