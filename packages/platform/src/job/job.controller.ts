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
  StreamableFile,
} from '@nestjs/common';
import { Id, JobCreateDto, JobRetrieveDto } from '@roc/core';
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
    return job;
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
  public async getProjectById(
    @Param('id') id: Id,
    @Query(ProjectExistsPipe) projectId: Id,
  ): Promise<JobRetrieveDto> {
    if (await this.jobService.existsWithInProject(projectId, id)) {
      return await this.jobService.getJobById(projectId, id);
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

  @Get('stdout.txt')
  @Header('content-type', 'text/html')
  public async getJobStdoutById(
    @Param('id') id: Id,
    @Query(ProjectExistsPipe) projectId: Id,
  ): Promise<string> {
    if (await this.jobService.existsWithInProject(projectId, id)) {
      const job = await this.jobService.getJobById(projectId, id);
      return job.result.stdout;
    } else {
      throw new JobDoesNotFoundException(id);
    }
  }

  @Get('log.html')
  @Header('content-type', 'text/html')
  public async getRobotLogsById(
    @Param('id') id: Id,
    @Query(ProjectExistsPipe) projectId: Id,
  ): Promise<StreamableFile> {
    if (await this.jobService.existsWithInProject(projectId, id)) {
      const job = await this.jobService.getJobById(projectId, id);
      const buff = await this.jobService.getFileAsBuffer(
        'roc',
        job.result.logUrl,
      );
      return new StreamableFile(buff);
    } else {
      throw new JobDoesNotFoundException(id);
    }
  }

  @Get('report.html')
  @Header('content-type', 'text/html')
  public async getRobotReportsById(
    @Param('id') id: Id,
    @Query(ProjectExistsPipe) projectId: Id,
  ): Promise<StreamableFile> {
    if (await this.jobService.existsWithInProject(projectId, id)) {
      const job = await this.jobService.getJobById(projectId, id);
      const buff = await this.jobService.getFileAsBuffer(
        'roc',
        job.result.reportUrl,
      );
      return new StreamableFile(buff);
    } else {
      throw new JobDoesNotFoundException(id);
    }
  }

  @Get('output.xml')
  @Header('content-type', 'application/xml')
  public async getRobotOutputById(
    @Param('id') id: Id,
    @Query(ProjectExistsPipe) projectId: Id,
  ): Promise<StreamableFile> {
    if (await this.jobService.existsWithInProject(projectId, id)) {
      const job = await this.jobService.getJobById(projectId, id);
      const buff = await this.jobService.getFileAsBuffer(
        'roc',
        job.result.outputUrl,
      );
      return new StreamableFile(buff);
    } else {
      throw new JobDoesNotFoundException(id);
    }
  }
}
