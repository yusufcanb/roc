import {Injectable} from '@angular/core';
import {Id} from "../../../types";
import {HttpClient} from "@angular/common/http";
import {environment as angularEnvironment} from "../../../environments/environment";
import {Job} from "../job.model";

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) {
  }

  public getJobsByProject(projectId: Id) {
    return this.http.get<Job[]>(`${angularEnvironment.apiService}/job?projectId=${projectId}`)
  }

}
