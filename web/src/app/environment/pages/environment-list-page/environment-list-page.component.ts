import {Component, OnInit} from '@angular/core';
import {EnvironmentService} from "../../services/environment.service";
import {Environment} from "../../environment.model";
import {MatDialog} from "@angular/material/dialog";
import {VariableEditDialogComponent} from "../../components/variable-edit-dialog/variable-edit-dialog.component";
import {ProjectService} from "../../../project/services/project.service";
import {Id} from "../../../../types";

@Component({
  selector: 'roc-environment-list-page',
  templateUrl: './environment-list-page.component.html',
  styleUrls: ['./environment-list-page.component.scss']
})
export class EnvironmentListPageComponent implements OnInit {
  environments!: Array<Environment>;

  constructor(public dialog: MatDialog, public projectService: ProjectService, public environmentService: EnvironmentService) {
  }

  ngOnInit(): void {
    this.environmentService.environments$.subscribe(envs => this.environments = envs)
  }

  onCreate() {
    const dialogRef = this.dialog.open(VariableEditDialogComponent, {
      hasBackdrop: true,
      disableClose: true,
      height: "75vh",
      width: "50vw",
      data: {
        mode: "create",
        obj: null
      }
    });

    dialogRef.afterClosed()
      .subscribe(dto => {
        if (dto) {
          const environment = new Environment();
          environment.id = dto.id;
          environment.name = dto.name;
          environment.description = dto.description;
          this.environments.push(environment);
        }
      })
  }

}
