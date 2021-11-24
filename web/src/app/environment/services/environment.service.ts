import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment as angularEnvironment} from "../../../environments/environment";
import {Id, Nullable} from "../../../types";
import {map} from "rxjs/operators";
import {Environment, EnvironmentDTO} from "../environment.model";

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  private readonly _environments$ = new BehaviorSubject<Environment[]>([]);
  private readonly _selectedEnvironment$ = new BehaviorSubject<Nullable<Environment>>(null);

  readonly environments$ = this._environments$.asObservable();
  readonly selectedEnvironment$ = this._selectedEnvironment$.asObservable();

  constructor(private http: HttpClient) {
  }

  selectEnvironment(environmentId: Id) {
    this.environments$.subscribe(environments => {
      const selectedIndex = environments.findIndex((e: Environment) => e.id === environmentId);
      if (selectedIndex != -1) {
        this._selectedEnvironment$.next(environments[selectedIndex]);
      } else this._selectedEnvironment$.next(null);
    });
  }

  fetchEnvironmentsByProjectId(projectId: Id) {
    const endpoint = `${angularEnvironment.apiService}/environment?projectId=${projectId}`;
    return this.http.get<EnvironmentDTO[]>(endpoint)
      .pipe(
        map(response => this.setEnvironmentsWithDtos(response))
      );
  }

  setEnvironments(environments: Environment[]) {
    this._environments$.next(environments);
  }

  setEnvironmentsWithDtos(environmentDtos: EnvironmentDTO[]) {
    const envs: Environment[] = [];
    environmentDtos.forEach(dto => envs.push(new Environment(dto)))
    this._environments$.next(envs);
  }

  saveEnvironment(environmentId: Id, dto: { name: string, description: string, code: string }) {
    const endpoint = `${angularEnvironment.apiService}/environment/${environmentId}`;
    return this.http.put<EnvironmentDTO[]>(endpoint, dto);
  }

  createEnvironment(projectId: Id, dto: { code: string; name: string; description: string }) {
    const endpoint = `${angularEnvironment.apiService}/environment?projectId=${projectId}`;
    return this.http.post<EnvironmentDTO>(endpoint, dto);
  }

  deleteEnvironment(environmentId: Id) {
    const endpoint = `${angularEnvironment.apiService}/environment/${environmentId}`;
    return this.http.delete<any>(endpoint);
  }

}
