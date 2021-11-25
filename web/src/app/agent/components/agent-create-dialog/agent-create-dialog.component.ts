import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {ProjectService} from "../../../project/services/project.service";
import {Agent} from "../../agent.model";
import {AgentService} from "../../services/agent.service";

@Component({
  selector: 'roc-agent-create-dialog',
  templateUrl: './agent-create-dialog.component.html',
  styleUrls: ['./agent-create-dialog.component.scss']
})
export class AgentCreateDialogComponent implements OnInit {
  mode: "update" | "create";

  displayName: any;
  os: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { mode: "update" | "create", obj: Agent },
    public dialogRef: MatDialogRef<AgentCreateDialogComponent>,
    private http: HttpClient,
    private projectService: ProjectService,
    private agentService: AgentService
  ) {
    this.mode = data.mode;
    if (data.mode === "update") {
    } else {

    }
  }

  ngOnInit(): void {
  }

  onSave() {
    this.projectService.selectedProject$
      .subscribe(project => {
        this.agentService.createAgent(project!.id, {
          displayName: this.displayName,
          os: this.os
        })
          .subscribe(
            agent => this.dialogRef.close(agent),
            error => this.dialogRef.close(null)
          )
      })

  }

}
