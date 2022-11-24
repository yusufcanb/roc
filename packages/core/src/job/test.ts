import { Job } from '.';

describe('core.job', () => {
  describe('Job', () => {
    test('::constructor()', () => {
      const job = new Job();
      expect(job).not.toBe(null);

      job.projectId = 'test-proj';
      job.taskForceId = 'api-task-force';
      job.environmentId = 'dev-env';
      job.createdAt = 'Thu Nov 24 2022 23:07:17 GMT+0100';
      expect(job.createdAt).toBeInstanceOf(Date);
      expect(job.createdAt).toStrictEqual(
        new Date('Thu Nov 24 2022 23:07:17 GMT+0100'),
      );
    });

    test('::fromPlainObject()', () => {
      const plainObject = {
        id: 'test-env',
        projectId: 'test-proj',
        taskForceId: 'api-task-force',
        environmentId: 'dev-env',
        createdAt: new Date(),
      };
      const job = Job.fromPlainObject(plainObject);

      expect(job).not.toBe(null);
      expect(job).toBeInstanceOf(Job);

      expect(job.id).toBe(plainObject.id);
      expect(job.projectId).toBe(plainObject.projectId);
      expect(job.taskForceId).toBe(plainObject.taskForceId);
      expect(job.environmentId).toBe(plainObject.environmentId);

      expect(job.createdAt).not.toBeNull();
      expect(job.createdAt).toBeInstanceOf(Date);
    });
  });
});
