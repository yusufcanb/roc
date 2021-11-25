import {Component, OnInit, ViewChild} from '@angular/core';
import {TaskForceService} from "../../services/task-force.service";
import {ActivatedRoute} from "@angular/router";
import {TaskForce} from "../../task-force.model";
import {JobService} from "../../../job/services/job.service";
import {Job} from "../../../job/job.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {TaskForceSourceEditDialogComponent} from "../../components/task-force-source-edit-dialog/task-force-source-edit-dialog.component";
import {environment} from "../../../../environments/environment";


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

  constructor(private route: ActivatedRoute, public dialog: MatDialog, public taskForceService: TaskForceService, public jobService: JobService) {
  }

  ngOnInit(): void {
    const {taskForceId} = this.route.snapshot.queryParams;
    this.isLoading = true;
    this.taskForceService.getTaskForceById(taskForceId)
      .subscribe(
        taskForceDto => {
          this.taskForce = new TaskForce(taskForceDto);
        },
        () => null,
        () => this.isLoading = false
      );

    this.taskForceService.getJobsByTaskForceId(taskForceId)
      .subscribe(
        jobs => {
          this.jobs = jobs;
          this.jobs = this.jobs.sort((j: any) => -j.createdAt);
          this.dataSource = new MatTableDataSource<Job>(this.jobs);
          this.dataSource.paginator = this.paginator;
        }
      )
  }

  openSourceEditDialog() {
    const dialogRef = this.dialog.open(TaskForceSourceEditDialogComponent, {
      hasBackdrop: true,
      minWidth: 500,
      disableClose: true,
      data: this.taskForce
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        this.taskForce.sourceType = result.data.sourceType;
        this.taskForce.repositoryUrl = result.data.repositoryUrl;
        this.taskForce.packageUrl = result.data.packageUrl;
      }
    });
  }

  get queuedJobCount(): number {
    return this.jobs.filter(job => job.status == "QUEUE").length;
  }

  get successJobCount(): number {
    return this.jobs.filter(job => job.status == "SUCCESS").length;
  }

  get failedJobCount(): number {
    return this.jobs.filter(job => job.status == "FAIL").length;
  }
}
