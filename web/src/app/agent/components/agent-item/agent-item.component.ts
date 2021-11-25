import {Component, Input, OnInit} from '@angular/core';
import {Agent} from "../../agent.model";

@Component({
  selector: 'roc-agent-item',
  templateUrl: './agent-item.component.html',
  styleUrls: ['./agent-item.component.scss']
})
export class AgentItemComponent implements OnInit {
  @Input() agent!: Agent;

  constructor() {
  }

  ngOnInit(): void {
  }

}
