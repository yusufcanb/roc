import {Component, Input, OnInit} from '@angular/core';
import {TaskForce} from "../../task-force.model";

@Component({
  selector: 'roc-task-force-list-item',
  templateUrl: './task-force-list-item.component.html',
  styleUrls: ['./task-force-list-item.component.scss']
})
export class TaskForceListItemComponent implements OnInit {
  @Input() taskForce!: TaskForce;

  constructor() {
  }

  ngOnInit(): void {
  }

}
