import {Injectable} from '@angular/core';
import {Id, Nullable} from "../../../types";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {environment as angularEnvironment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {Agent, AgentDTO} from "../agent.model";
import {ProjectService} from "../../project/services/project.service";

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private readonly _agents$ = new BehaviorSubject<Agent[]>([]);
  private readonly _selectedAgent$ = new BehaviorSubject<Nullable<Agent>>(null);

  readonly agents$ = this._agents$.asObservable();
  readonly selectedAgent$ = this._selectedAgent$.asObservable();

  constructor(private readonly projectService: ProjectService, private readonly http: HttpClient) {
    this.projectService.selectedProject$
      .subscribe(project => {
        if (project) {
          console.log(project);
          this.getAgentsByProjectId(project.id).subscribe(agents => console.log(agents));
        }
      })
  }

  getAgentsByProjectId(projectId: Id) {
    const endpoint = `${angularEnvironment.apiService}/agent/?projectId=${projectId}`;
    return this.http.get<AgentDTO[]>(endpoint)
      .pipe(
        map(agentDtos => {
          const agents: Agent[] = [];
          agentDtos.forEach(a => agents.push(new Agent(a)))
          return agents;
        }),
        map(agents => this._agents$.next(agents))
      );
  }

  selectAgent(agentId: Id) {
    this.agents$.subscribe(agents => {
      const selectedIndex = agents.findIndex((a) => a.id === agentId);
      if (selectedIndex != -1) {
        this._selectedAgent$.next(agents[selectedIndex]);
      } else this._selectedAgent$.next(null);
    });
  }

}
