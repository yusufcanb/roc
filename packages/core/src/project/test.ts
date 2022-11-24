import { Project } from '.';

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
  });

  test('::toPlainObject()', () => {
    const project = new Project();
    project.id = 'hello-world';
    project.tags = ['dev', 'test'];
    project.createdAt = new Date();
    project.updatedAt = new Date();

    const plainObject = Project.toPlainObject(project);

    expect(project.id).not.toBe(plainObject.id);
    expect(project.createdAt).not.toBe(plainObject.createdAt);
    expect(project.updatedAt).not.toBe(plainObject.updatedAt);
    expect(project.tags).not.toStrictEqual(plainObject.tags);
  });
});
