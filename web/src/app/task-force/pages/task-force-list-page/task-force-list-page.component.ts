import {Component, OnInit} from '@angular/core';
import {TaskForceService} from "../../services/task-force.service";
import {TaskForce} from "../../task-force.model";
import {ProjectService} from "../../../project/services/project.service";
import {Id} from "../../../../types";

@Component({
  selector: 'roc-task-force-list-page',
  templateUrl: './task-force-list-page.component.html',
  styleUrls: ['./task-force-list-page.component.scss']
})
export class TaskForceListPageComponent implements OnInit {
  taskForces: Array<TaskForce> = [];

  constructor(private projectService: ProjectService, private taskForceService: TaskForceService) {
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

}
