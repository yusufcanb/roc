import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Id} from "../../../types";
import {environment as angularEnvironment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {TaskForce, TaskForceDto} from "../task-force.model";

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
}
