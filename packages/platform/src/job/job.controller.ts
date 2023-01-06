import { Body, Controller, Inject, Post, Query } from '@nestjs/common';
import { Id, Job, JobCreateDto } from '@roc/core';
import { ProjectExistsPipe } from '../project/project.pipe';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
  @Inject()
  private readonly jobService: JobService;

  @Post()
  public async createNewJob(
    @Query(ProjectExistsPipe) projectId: Id,
    @Body() dto: JobCreateDto,
  ): Promise<any> {
    this.jobService
      .executeJob(new Job())
      .then(() => console.log('Done!'))
      .catch((err) => console.error(err));

    return {
      hello: 'world!',
    };
  }
}
