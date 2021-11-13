import {Component, OnInit, ViewChild} from '@angular/core';
import {TaskForceService} from "../../services/task-force.service";
import {ActivatedRoute} from "@angular/router";
import {TaskForce} from "../../task-force.model";
import {JobService} from "../../../job/services/job.service";
import {Job} from "../../../job/job.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";


@Component({
  selector: 'roc-task-force-detail-page',
  templateUrl: './task-force-detail-page.component.html',
  styleUrls: ['./task-force-detail-page.component.scss']
})
export class TaskForceDetailPageComponent implements OnInit {
  isLoading = false;
  taskForce!: TaskForce;

  jobs: Job[] = [];
  displayedColumns: string[] = ['id', 'environment', 'agent', 'createdAt', 'state'];
  dataSource: MatTableDataSource<Job> = new MatTableDataSource<Job>([]);

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private route: ActivatedRoute, public taskForceService: TaskForceService, public jobService: JobService) {
  }

  ngOnInit(): void {
    const {taskForceId} = this.route.snapshot.queryParams;
    this.isLoading = true;
    this.taskForceService.getTaskForceById(taskForceId)
      .subscribe(
        taskForceDto => this.taskForce = new TaskForce(taskForceDto),
        () => null,
        () => this.isLoading = false
      );

    this.taskForceService.getJobsByTaskForceId(taskForceId)
      .subscribe(
        jobs => {
          this.jobs = jobs;
          this.dataSource = new MatTableDataSource<Job>(jobs);
          this.dataSource.paginator = this.paginator;
        }
      )
  }

  get queuedJobCount(): number {
    return this.jobs.filter(job => job.status == "QUEUE").length;
  }

  get successJobCount(): number {
    return this.jobs.filter(job => job.status == "FAILED").length;
  }

  get failedJobCount(): number {
    return this.jobs.filter(job => job.status == "SUCCESS").length;
  }
}
