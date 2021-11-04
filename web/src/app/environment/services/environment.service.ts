import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
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
    const endpoint = `${environment.apiService}/environment?projectId=${projectId}`;
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

}
