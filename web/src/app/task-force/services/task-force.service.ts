import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, zip} from "rxjs";
import {Id} from "../../../types";
import {environment as angularEnvironment} from "../../../environments/environment";
import {catchError, filter, map, take} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {TaskForce, TaskForceDto} from "../task-force.model";
import {Job, JobDto} from "../../job/job.model";
import {AgentService} from "../../agent/services/agent.service";
import {EnvironmentService} from "../../environment/services/environment.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class TaskForceService {

  private readonly _taskForces = new BehaviorSubject<TaskForce[]>([]);
  readonly taskForces$ = this._taskForces.asObservable();

  constructor(
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private agentService: AgentService,
    private environmentService: EnvironmentService,
  ) {
  }

  private convertDtosToModels<T, M>(dtos: Array<T>, type: (new (obj: any) => M)): Array<M> {
    const models: Array<M> = [];
    dtos.forEach(dto => models.push(new type(dto)));
    return models;
  }


  getTaskForcesByProjectId(projectId: Id): Observable<TaskForce[]> {
    const endpoint = `${angularEnvironment.apiService}/task-force/?projectId=${projectId}`;
    return this.http.get<TaskForceDto[]>(endpoint)
      .pipe<TaskForce[], any>(
        map((dtos: TaskForceDto[]) => this.convertDtosToModels<TaskForceDto, TaskForce>(dtos, TaskForce)),
        map((taskForces: TaskForce[]) => this._taskForces.next(taskForces))
      );
  }

  getTaskForceById(taskForceId: Id) {
    const endpoint = `${angularEnvironment.apiService}/task-force/${taskForceId}`;
    return this.http.get<TaskForceDto>(endpoint);
  }

  updateTaskForce(taskForceId: Id, taskForce: Partial<TaskForce>) {
    const endpoint = `${angularEnvironment.apiService}/task-force/${taskForceId}`;
    return this.http.put<any>(endpoint, taskForce);
  }

  getJobsByTaskForceId(taskForceId: Id): Observable<Job[]> {
    const endpoint = `${angularEnvironment.apiService}/task-force/${taskForceId}/jobs`;
    return this.http.get<any>(endpoint)
      .pipe(
        map((dtos: JobDto[]) => this.convertDtosToModels<JobDto, Job>(dtos, Job)),
      );
  }

  uploadPackage(taskForceId: Id, robotPackage: File): Observable<boolean> {
    // const endpoint = `${angularEnvironment.apiService}/oss/upload`;
    const endpoint = `${angularEnvironment.apiService}/task-force/${taskForceId}/package`;
    const formData: FormData = new FormData();
    formData.append('file', robotPackage, robotPackage.name);
    return this.http
      .post(endpoint, formData)
      .pipe(
        map(() => true)
      );
  }

  executeTaskForce(taskForceId: Id, environmentId: Id, agentId: Id) {
    const endpoint = `${angularEnvironment.apiService}/task-force/${taskForceId}/execute`;
    return this.http.post<any>(endpoint, {
      agentId: agentId,
      environmentId: environmentId
    });
  }


  executeWithId(taskForceId: Id) {
    zip(this.agentService.selectedAgent$, this.environmentService.selectedEnvironment$)
      .pipe(take(1))
      .subscribe(stream => {
        const [environment, agent] = stream;
        if (agent == null) {
          this._snackBar.open("No agent selected", "Close")
        } else if (environment === null) {
          this._snackBar.open("No Environment selected", "Close")
        } else {
          this.executeTaskForce(taskForceId, environment.id, agent.id)
            .subscribe(
              response => this._snackBar.open(`New Job created with id: ${response.id}`, "Close"),
              error => {
                console.error(error);
                this._snackBar.open(error.message, "Close")
              },
            );
        }
      })
  }


}
