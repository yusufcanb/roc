import {Injectable} from '@angular/core';
import {Id} from "../../../types";
import {HttpClient} from "@angular/common/http";
import {environment as angularEnvironment} from "../../../environments/environment";
import {Job, JobDto} from "../job.model";
import {TaskForce, TaskForceDto} from "../../task-force/task-force.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) {
  }

  private convertDtosToModels(dtos: Array<JobDto>): Array<Job> {
    const jobs: Array<Job> = [];
    dtos.forEach(dto => jobs.push(new Job(dto)))
    return jobs;
  }

  public getJobsByProject(projectId: Id) {
    return this.http.get<Job[]>(`${angularEnvironment.apiService}/job?projectId=${projectId}`)
      .pipe(map(dtos => this.convertDtosToModels(dtos)));
  }

}
