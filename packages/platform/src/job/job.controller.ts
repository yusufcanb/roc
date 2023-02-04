import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Inject,
  Logger,
  Param,
  Post,
  Query,
  Req,
  StreamableFile,
} from '@nestjs/common';
import { Id, Job, JobCreateDto, JobRetrieveDto } from '@roc/core';
import { Request } from 'express';
import { ProjectExistsPipe } from '../project/project.pipe';
import { JobDoesNotFoundException } from './job.exception';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
  private readonly logger = new Logger(JobController.name);

  @Inject()
  private readonly jobService: JobService;

  @Get()
  public async getJobsByProjectId(
    @Query(ProjectExistsPipe) projectId: Id,
  ): Promise<JobRetrieveDto[]> {
    return JobRetrieveDto.fromMany(
      await this.jobService.getJobsByProjectId(projectId),
    );
  }

  @Post()
  public async createNewJob(
    @Query(ProjectExistsPipe) projectId: Id,
    @Body() dto: JobCreateDto,
  ): Promise<any> {
    const job = await this.jobService.createNewJob(projectId, dto);
    this.jobService
      .executeJob(job)
      .then(() => this.logger.log(`Job<${job.id}> done.`))
      .catch((err) => this.logger.error(err));
    return JobRetrieveDto.from(job);
  }

  @Delete()
  public async deleteAllJobsWithinProject(
    @Query(ProjectExistsPipe) projectId: Id,
  ): Promise<void> {
    this.jobService.deleteJobsByProjectId(projectId);
  }
}

@Controller('job/:id')
export class JobDetailController {
  private readonly logger = new Logger(JobDetailController.name);

  @Inject()
  private readonly jobService: JobService;

  @Get()
  public async getJobById(
    @Param('id') id: Id,
    @Query(ProjectExistsPipe) projectId: Id,
  ): Promise<JobRetrieveDto> {
    if (await this.jobService.existsWithInProject(projectId, id)) {
      return JobRetrieveDto.from(
        await this.jobService.getJobById(projectId, id),
      );
    } else {
      throw new JobDoesNotFoundException(id);
    }
  }

  @Delete()
  public async deleteJobById(
    @Param('id') id: Id,
    @Query(ProjectExistsPipe) projectId: Id,
  ) {
    if (await this.jobService.existsWithInProject(projectId, id)) {
      return await this.jobService.deleteJob(projectId, id);
    } else {
      throw new JobDoesNotFoundException(id);
    }
  }

  @Get('artifacts/*')
  @Header('content-type', 'text/html')
  public async getJobStdoutById(
    @Param('id') id: Id,
    @Req() request: Request,
  ): Promise<StreamableFile> {
    const job = (await this.jobService.searchJob(id)) as Job;
    if (job != null) {
      const artifactPath = request.params[0];
      const key = `${job.projectId}/${job.taskForceId}/${job.id}/${artifactPath}`;

      const buff = await this.jobService.getFileAsBuffer('roc', key);
      return new StreamableFile(buff);
    } else {
      throw new JobDoesNotFoundException(id);
    }
  }
}
