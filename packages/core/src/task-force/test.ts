import { TaskForce } from '.';

describe('core.task-force', () => {
  describe('TaskForce', () => {
    test('::constructor()', () => {
      const taskForce = new TaskForce();
      expect(taskForce).not.toBe(null);

      taskForce.id = 'api-check';
      taskForce.description = 'API Check tasks';
      taskForce.projectId = 'default';

      taskForce.repository = 'https://github.com/yusufcab/roc';
      taskForce.runner = 'yusufcab/roc-runner:latest';

      expect(taskForce.id).toBe('api-check');
      expect(taskForce.description).toBe('API Check tasks');
      expect(taskForce.repository).toBe('https://github.com/yusufcab/roc');
      expect(taskForce.runner).toBe('yusufcab/roc-runner:latest');
    });

    test('::toPlainObject()', () => {
      const taskForce = new TaskForce();
      taskForce.id = 'hello-world';
      taskForce.runner = 'yusufcab/roc-runner:latest';
      taskForce.repository = 'https://github.com/yusufcab/roc';
      taskForce.tags = ['dev', 'test'];

      const plainObject = TaskForce.toPlainObject(taskForce);

      expect(taskForce.id).toBe(plainObject.id);
      expect(taskForce.runner).toBe(plainObject.runner);
      expect(taskForce.repository).toBe(plainObject.repository);
      expect(taskForce.tags).toStrictEqual(plainObject.tags);
    });
  });
});
