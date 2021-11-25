import {EventEmitter, Component, Input, OnInit, Output} from '@angular/core';
import {TaskForce} from "../../task-force.model";
import {Id} from "../../../../types";

@Component({
  selector: 'roc-task-force-list',
  templateUrl: './task-force-list.component.html',
  styleUrls: ['./task-force-list.component.scss']
})
export class TaskForceListComponent implements OnInit {
  @Input() taskForceList!: Array<TaskForce>;
  @Output() executeTask = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  onExecuteTaskForce($event: Id) {
    this.executeTask.emit($event);
  }
}
