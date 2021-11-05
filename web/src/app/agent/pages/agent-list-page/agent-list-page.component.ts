import {Component, OnInit} from '@angular/core';
import {AgentService} from "../../services/agent.service";
import {Agent} from "../../agent.model";

@Component({
  selector: 'roc-agent-list-page',
  templateUrl: './agent-list-page.component.html',
  styleUrls: ['./agent-list-page.component.scss']
})
export class AgentListPageComponent implements OnInit {
  agents: Agent[] = [];

  constructor(public agentService: AgentService) {
  }

  ngOnInit(): void {
    this.agentService.agents$.subscribe(agents => this.agents = agents);
  }

}
