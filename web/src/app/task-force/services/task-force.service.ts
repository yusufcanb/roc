import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Id} from "../../../types";
import {environment as angularEnvironment} from "../../../environments/environment";
import {filter, map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {TaskForce, TaskForceDto} from "../task-force.model";
import {JobDto} from "../../job/job.model";

@Injectable({
  providedIn: 'root'
})
export class TaskForceService {

  private readonly _taskForces = new BehaviorSubject<TaskForce[]>([]);
  readonly taskForces$ = this._taskForces.asObservable();

  constructor(private http: HttpClient) {
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

}
