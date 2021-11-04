import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Project, ProjectDTO} from "../project.model";
import {Id, Nullable} from "../../../types";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly _projects$ = new BehaviorSubject<Array<Project>>([]);
  private readonly _selectedProject$ = new BehaviorSubject<Nullable<Project>>(null);

  readonly projects$ = this._projects$.asObservable();
  readonly selectedProject$ = this._selectedProject$.asObservable();

  constructor(private http: HttpClient) {
  }

  fetchProjects() {
    const endpoint = `${environment.apiService}/project`;
    return this.http.get<Array<ProjectDTO>>(endpoint);
  }

  fetchProjectById(projectId: Id) {
    const endpoint = `${environment.apiService}/project/${projectId}`;
    return this.http.get<Array<ProjectDTO>>(endpoint);
  }

  createProject(project: Project) {
    const endpoint = `${environment.apiService}/project`;
    return this.http.post<Array<ProjectDTO>>(endpoint, {...project});
  }

  setProjects(projects: Array<ProjectDTO>) {
    const projectModels: Array<Project> = [];
    projects.forEach(p => projectModels.push(new Project(p)))
    this._projects$.next(projectModels);
  }

  selectProject(projectId: Id) {
    this.projects$.subscribe(projects => {
      const selectedIndex = projects.findIndex(p => p.id === projectId);
      if (selectedIndex != -1) {
        this._selectedProject$.next(projects[selectedIndex]);
      } else this._selectedProject$.next(null);
    });
  }

}
