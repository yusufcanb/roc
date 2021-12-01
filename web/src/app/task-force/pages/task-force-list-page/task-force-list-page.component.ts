import {Component, OnInit} from '@angular/core';
import {TaskForceService} from "../../services/task-force.service";
import {TaskForce} from "../../task-force.model";
import {ProjectService} from "../../../project/services/project.service";
import {Id} from "../../../../types";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AgentService} from "../../../agent/services/agent.service";
import {EnvironmentService} from "../../../environment/services/environment.service";

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
    this.taskForceService.executeWithId(taskForceId);
  }

}
