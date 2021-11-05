import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../services/project.service";
import {Project} from "../../project.model";

@Component({
  selector: 'roc-project-list-page',
  templateUrl: './project-list-page.component.html',
  styleUrls: ['./project-list-page.component.scss']
})
export class ProjectListPageComponent implements OnInit {

  projects!: Project[];

  constructor(public projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.projectService.projects$.subscribe(projects => this.projects = projects);
  }

}
