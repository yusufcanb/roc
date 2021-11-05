import {Component, Input, OnInit} from '@angular/core';
import {Agent} from "../../agent.model";

@Component({
  selector: 'roc-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss']
})
export class AgentListComponent implements OnInit {
  @Input() agentList!: Array<Agent>;

  constructor() {
  }

  ngOnInit(): void {
  }

}
