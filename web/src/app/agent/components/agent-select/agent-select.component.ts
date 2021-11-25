import {Component, OnInit} from '@angular/core';
import {AgentService} from "../../services/agent.service";

@Component({
  selector: 'roc-agent-select',
  templateUrl: './agent-select.component.html',
  styleUrls: ['./agent-select.component.scss']
})
export class AgentSelectComponent implements OnInit {

  constructor(public agentService: AgentService) {
  }

  ngOnInit(): void {
  }

}
