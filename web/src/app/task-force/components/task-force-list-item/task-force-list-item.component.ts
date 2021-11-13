import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskForce} from "../../task-force.model";
import {Id} from "../../../../types";

@Component({
  selector: 'roc-task-force-list-item',
  templateUrl: './task-force-list-item.component.html',
  styleUrls: ['./task-force-list-item.component.scss']
})
export class TaskForceListItemComponent implements OnInit {
  @Input() taskForce!: TaskForce;
  @Output() executeTask = new EventEmitter<Id>();

  ngOnInit() {
  }

  onExecuteTask() {
    this.executeTask.emit(this.taskForce.id)
  }


}
