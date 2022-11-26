import { TaskForce } from '.';

describe('core.project', () => {
  describe('Project', () => {
    test('::constructor()', () => {
      const taskForce = new TaskForce();
      expect(taskForce).not.toBe(null);

      taskForce.id = 'api-check';
      taskForce.name = 'api-check';
      taskForce.description = 'API Check tasks';
      taskForce.projectId = 'default';
      taskForce.repository = 'https://github.com/yusufcab/roc';
      taskForce.runner = 'yusufcab/roc-runner:latest';

      expect(taskForce.id).toBe('api-check');
      expect(taskForce.name).toBe('api-check');
      expect(taskForce.description).toBe('API Check tasks');
      expect(taskForce.repository).toBe('https://github.com/yusufcab/roc');
      expect(taskForce.runner).toBe('yusufcab/roc-runner:latest');
    });
  });
});
