import {Component, OnInit} from '@angular/core';
import {ProjectService} from "./project/services/project.service";
import {ProjectDTO} from "./project/project.model";
import {EnvironmentService} from "./environment/services/environment.service";
import {AgentService} from "./agent/services/agent.service";
import {zip} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {OnBoardingDialogComponent} from "./dashboard/components/on-boarding-dialog/on-boarding-dialog.component";
import {TranslateService} from "@ngx-translate/core";


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  projectsAreLoading = false;

  tiles: Tile[] = [
    {text: 'One', cols: 12, rows: 1, color: 'lightblue',},
    {text: 'Two', cols: 4, rows: 1, color: 'lightgreen'},
    {text: 'Three', cols: 4, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 4, rows: 1, color: '#DDBDF1'},
  ];

  constructor(
    private translate: TranslateService,
    private dialog: MatDialog,
    private projectService: ProjectService,
    private environmentService: EnvironmentService,
    private agentService: AgentService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    this.projectsAreLoading = true;
    this.projectService.fetchProjects()
      .subscribe(
        (projects) => this.onFetchSuccess(projects),
        (err) => console.error(err),
        () => this.projectsAreLoading = false
      );
  }

  private onFetchSuccess(projects: ProjectDTO[]) {
    if (projects.length > 0) {
      const selectedProject = projects[0];
      this.projectService.setProjects(projects);
      this.projectService.selectProject(selectedProject.id);

      const subject = zip(
        this.environmentService.fetchEnvironmentsByProjectId(selectedProject.id),
        this.agentService.getAgentsByProjectId(selectedProject.id)
      );

      subject.subscribe(response => console.log(response));
    } else {
      const dialogRef = this.dialog.open(OnBoardingDialogComponent, {
        height: "100vh",
        width: "100%",
        disableClose: true,
        backdropClass: "backdrop-black"
      })

      dialogRef.afterClosed().subscribe(closed => this.ngOnInit())
    }

  }

}
