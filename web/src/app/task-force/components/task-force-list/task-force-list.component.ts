import {Component, Input, OnInit} from '@angular/core';
import {TaskForce} from "../../task-force.model";

@Component({
  selector: 'roc-task-force-list',
  templateUrl: './task-force-list.component.html',
  styleUrls: ['./task-force-list.component.scss']
})
export class TaskForceListComponent implements OnInit {
  @Input() taskForceList!: Array<TaskForce>;

  constructor() {
  }

  ngOnInit(): void {
  }

}
