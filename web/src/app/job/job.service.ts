import {Injectable} from '@angular/core';
import {Id} from "../../types";

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor() {
  }

  public getJobsByProject(projectId: Id) {
    return null
  }
}
