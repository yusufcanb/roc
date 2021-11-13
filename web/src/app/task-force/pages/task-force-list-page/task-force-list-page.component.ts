import {Component, OnInit} from '@angular/core';
import {TaskForceService} from "../../services/task-force.service";
import {TaskForce} from "../../task-force.model";
import {ProjectService} from "../../../project/services/project.service";
import {Id} from "../../../../types";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AgentService} from "../../../agent/services/agent.service";
import {EnvironmentService} from "../../../environment/services/environment.service";
import {zip} from "rxjs";
import {take, takeLast} from "rxjs/operators";

@Component({
  selector: 'roc-task-force-list-page',
  templateUrl: './task-force-list-page.component.html',
  styleUrls: ['./task-force-list-page.component.scss']
})
export class TaskForceListPageComponent implements OnInit {
  taskForces: Array<TaskForce> = [];


  constructor(private _snackBar: MatSnackBar,
              private projectService: ProjectService,
              private taskForceService: TaskForceService,
              private agentService: AgentService,
              private environmentService: EnvironmentService) {
    this.taskForceService.getTaskForcesByProjectId(1);
  }

  ngOnInit(): void {
    this.projectService.selectedProject$
      .subscribe(selectedProject => {
        if (selectedProject) {
          this.taskForceService.getTaskForcesByProjectId(selectedProject?.id as Id)
            .subscribe(response => console.log(response));
        }
      })
    this.taskForceService.taskForces$
      .subscribe(taskForces => {
        this.taskForces = taskForces
      });
  }

  onExecuteTaskClicked(taskForceId: Id) {
    console.log("Task force will executed: " + taskForceId);
    zip(this.agentService.selectedAgent$, this.environmentService.selectedEnvironment$)
      .pipe(take(1))
      .subscribe(stream => {
        const [environment, agent] = stream;
        if (agent == null) {
          this._snackBar.open("No agent selected", "Close")
        } else if (environment === null) {
          this._snackBar.open("No Environment selected", "Close")
        } else {
          this.taskForceService.executeTaskForce(taskForceId, environment.id, agent.id)
            .subscribe(
              response => this._snackBar.open(`New Job created with id: ${response.id}`, "Close"),
              error => {
                console.error(error);
                this._snackBar.open(error.message, "Close")
              },
            );
        }
      })

  }

}
