import {Component, OnInit} from '@angular/core';
import {AgentService} from "../../services/agent.service";
import {Agent} from "../../agent.model";
import {MatDialog} from "@angular/material/dialog";
import {AgentCreateDialogComponent} from "../../components/agent-create-dialog/agent-create-dialog.component";

@Component({
  selector: 'roc-agent-list-page',
  templateUrl: './agent-list-page.component.html',
  styleUrls: ['./agent-list-page.component.scss']
})
export class AgentListPageComponent implements OnInit {
  agents: Agent[] = [];

  constructor(private dialog: MatDialog, public agentService: AgentService) {
  }

  ngOnInit(): void {
    this.agentService.agents$.subscribe(agents => this.agents = agents);
  }

  onCreateClicked() {
    const dialogRef = this.dialog.open(AgentCreateDialogComponent, {
      hasBackdrop: true,
      disableClose: true,
      height: "35vh",
      width: "35vw",
      data: {
        mode: "create",
        obj: null
      }
    });

    dialogRef.afterClosed()
      .subscribe(dto => {
        const agent = new Agent();

        agent.id = dto.id;
        agent.displayName = dto.displayName;
        agent.os = dto.os;
        agent.lastActive = null as any;

        this.agents.push(dto);
      })
  }
}
