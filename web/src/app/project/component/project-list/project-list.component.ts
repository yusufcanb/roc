import {Component, Input, OnInit} from '@angular/core';
import {Project} from "../../project.model";

@Component({
  selector: 'roc-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  @Input() projectList!: Project[];

  constructor() {
  }

  ngOnInit(): void {
  }

}
