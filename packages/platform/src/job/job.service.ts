import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  Environment,
  Id,
  Job,
  JobCreateDto,
  RobotExecutor,
  RobotExecutorConfig,
  TaskForce,
} from '@roc/core';
import {
  TaskForceDoesNotExistException,
  TaskForceService,
} from '../task-force';

import { Client as MinioClient } from 'minio';

import {
  EnvironmentDoesNotExistException,
  EnvironmentService,
} from '../environment';

import { ExecutorResult } from '@roc/core';
import { randomUUID } from 'crypto';
import { JobRedisRepository } from './job.repository';
import { RedisClientType } from 'redis';

@Injectable()
export class JobService {
  private logger = new Logger('JobService');

  @Inject('MINIO_CLIENT')
  private readonly minio: MinioClient;

  @Inject('REDIS_CLIENT')
  protected readonly redis: RedisClientType;

  @Inject()
  private readonly repository: JobRedisRepository;

  @Inject()
  private readonly environmentService: EnvironmentService;

  @Inject()
  private readonly taskForceService: TaskForceService;

  @Inject('RobotExecutor')
  private readonly executor: RobotExecutor;

  public async searchJob(jobId: Id): Promise<any> {
    const keys = await this.redis.keys(`job.*.${jobId}`);
    if (keys.length > 0) {
      return Job.fromPlainObject(
        (await this.redis.json.get(keys[0])) as unknown,
      );
    } else {
      return null;
    }
  }

  public async existsWithInProject(projectId: Id, jobId: Id): Promise<boolean> {
    return this.repository.existsById(`${projectId}.${jobId}`);
  }

  public async getJobsByProjectId(projectId: Id): Promise<Job[]> {
    return this.repository.findByKey(`${projectId}.*`);
  }

  public async getJobById(projectId: Id, id: Id): Promise<Job> {
    return this.repository.getOneById(`${projectId}.${id}`);
  }

  public async createNewJob(projectId: Id, jobDto: JobCreateDto): Promise<Job> {
    if (
      !(await this.environmentService.existsWithInProject(
        projectId,
        jobDto.environmentId,
      ))
    ) {
      throw new EnvironmentDoesNotExistException();
    }

    if (
      !(await this.taskForceService.existsWithInProject(
        projectId,
        jobDto.taskForceId,
      ))
    ) {
      throw new TaskForceDoesNotExistException();
    }

    const job = new Job();
    job.id = randomUUID();
    job.projectId = projectId;
    job.environmentId = jobDto.environmentId;
    job.taskForceId = jobDto.taskForceId;
    job.createdAt = new Date();

    job.status = {
      isActive: true,
      isErrored: false,
      isSucceeded: false,
    };

    job.result = null;
    return this.repository.save(job);
  }

  public async executeJob(job: Job): Promise<ExecutorResult> {
    const config: RobotExecutorConfig = {
      jobId: job.id,
      environment: (await this.environmentService.getEnvironmentById(
        job.projectId,
        job.environmentId,
      )) as Environment,
      taskForce: (await this.taskForceService.getTaskForceById(
        job.projectId,
        job.taskForceId,
      )) as TaskForce,
      minio: {
        endpoint: new URL('http://roc-minio:9000'),
        accessKey: 'roc',
        accessSecret: 'roc-minio-pwd',
        bucket: 'roc',
      },
    };

    try {
      const result = await this.executor.execute(config);
      job.status.isActive = false;
      job.status.isSucceeded = result.isSucceeded;
      job.status.isErrored = result.isErrored;

      job.result = {
        stdout: result.stdout,
        completedAt: result.completedAt,
        outputUrl: result.outputUrl.dir,
        reportUrl: result.reportUrl.dir,
        logUrl: result.logUrl.dir,
      };
      this.repository.save(job);

      return result;
    } catch (err) {
      this.logger.error(err);
      job.status.isActive = false;
      job.status.isSucceeded = false;
      job.status.isErrored = true;

      job.result = null;
      this.repository.save(job);
    }
  }

  public async getFileAsBuffer(
    bucketName: string,
    objectName: string,
  ): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      this.minio.getObject(bucketName, objectName, (err, dataStream) => {
        if (err) {
          return reject(err);
        }
        dataStream.on('data', (chunk) => {
          chunks.push(chunk);
        });
        dataStream.on('end', () => {
          resolve(Buffer.concat(chunks));
        });
        dataStream.on('error', (err) => {
          reject(err);
        });
      });
    });
  }

  public async deleteJob(projectId: Id, jobId: Id): Promise<void> {
    return this.repository.deleteById(`${projectId}.${jobId}`);
  }

  public async deleteJobsByProjectId(projectId: Id) {
    return this.repository.deleteAll();
  }
}
