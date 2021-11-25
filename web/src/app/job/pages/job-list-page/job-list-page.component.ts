import {Component, OnInit, ViewChild} from '@angular/core';
import {JobService} from "../../services/job.service";
import {ProjectService} from "../../../project/services/project.service";
import {Job} from "../../job.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'roc-job-list-page',
  templateUrl: './job-list-page.component.html',
  styleUrls: ['./job-list-page.component.scss']
})
export class JobListPageComponent implements OnInit {
  isLoading = false;

  jobs: Array<Job> = [];

  displayedColumns: string[] = ['id', 'task-force', 'source', 'environment', 'agent', 'createdAt', 'state'];
  // @ts-ignore
  dataSource: MatTableDataSource<Job>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public projectService: ProjectService, public jobService: JobService, private _route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.projectService.selectedProject$
      .subscribe(project => {
        if (project) {
          this.jobService.getJobsByProject(project.id)
            .subscribe(
              (jobs: Job[]) => {
                this.jobs = jobs
                this.isLoading = false;

                const {taskForceId} = this._route.snapshot.queryParams;
                if (taskForceId) {
                  console.log(taskForceId);
                  this.dataSource = new MatTableDataSource<Job>(jobs.filter(job => job.taskForce.id === parseInt(taskForceId)));
                } else {
                  this.dataSource = new MatTableDataSource<Job>(jobs);
                }
                this.dataSource.paginator = this.paginator;
              },
            )
        }
      })
  }

}
