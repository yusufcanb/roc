import {Component, Input, OnInit} from '@angular/core';
import {Environment} from "../../environment.model";
import {MatDialog} from "@angular/material/dialog";
import {VariableEditDialogComponent} from "../variable-edit-dialog/variable-edit-dialog.component";

@Component({
  selector: 'roc-environment-list-item',
  templateUrl: './environment-list-item.component.html',
  styleUrls: ['./environment-list-item.component.scss']
})
export class EnvironmentListItemComponent implements OnInit {
  @Input() environment!: Environment;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  onEditEnvironment(environment: Environment) {
    const dialogRef = this.dialog.open(VariableEditDialogComponent, {
      hasBackdrop: true,
      disableClose: true,
      height: "75vh",
      width: "50vw",
      data: environment
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          environment.name = result.name;
          environment.description = result.description;
        }
      });
  }


}
