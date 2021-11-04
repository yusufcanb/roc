import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../services/project.service";

@Component({
  selector: 'roc-project-select',
  templateUrl: './project-select.component.html',
  styleUrls: ['./project-select.component.scss']
})
export class ProjectSelectComponent implements OnInit {
  constructor(public projectService: ProjectService) {
  }

  ngOnInit(): void {
  }

}
