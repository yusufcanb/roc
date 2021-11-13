import {Injectable} from '@angular/core';
import {BehaviorSubject, zip} from "rxjs";
import {Id} from "../../../types";
import {environment as angularEnvironment} from "../../../environments/environment";
import {filter, map, take} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {TaskForce, TaskForceDto} from "../task-force.model";
import {JobDto} from "../../job/job.model";
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
    private environmentService: EnvironmentService
  ) {
  }

  getTaskForcesByProjectId(projectId: Id) {
    const endpoint = `${angularEnvironment.apiService}/task-force/?projectId=${projectId}`;
    return this.http.get<TaskForceDto[]>(endpoint)
      .pipe(
        map(taskForceDtos => {
          const taskForces: TaskForce[] = [];
          taskForceDtos.forEach(dto => taskForces.push(new TaskForce(dto)))
          return taskForces;
        }),
        map(taskForces => this._taskForces.next(taskForces))
      );
  }

  getTaskForceById(taskForceId: Id) {
    const endpoint = `${angularEnvironment.apiService}/task-force/${taskForceId}`;
    return this.http.get<TaskForceDto>(endpoint);
  }

  getJobsByTaskForceId(taskForceId: Id) {
    const endpoint = `${angularEnvironment.apiService}/task-force/${taskForceId}/jobs`;
    return this.http.get<any>(endpoint);
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
