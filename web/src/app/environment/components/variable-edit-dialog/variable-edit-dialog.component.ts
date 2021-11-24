import {Component, Inject, OnInit} from '@angular/core';
import {EnvironmentService} from "../../services/environment.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Environment} from "../../environment.model";
import {Id} from "../../../../types";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ProjectService} from "../../../project/services/project.service";

@Component({
  selector: 'roc-variable-edit-dialog',
  templateUrl: './variable-edit-dialog.component.html',
  styleUrls: ['./variable-edit-dialog.component.scss']
})
export class VariableEditDialogComponent implements OnInit {
  mode: "update" | "create";
  editorOptions = {
    language: 'yaml'
  };

  id!: Id;
  name: string;
  description: string;
  code: string = '# Define your environment variables here in YAML format,\n# they will be assigned in job runtime.';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { mode: "update" | "create", obj: Environment },
    public dialogRef: MatDialogRef<VariableEditDialogComponent>,
    private http: HttpClient,
    private projectService: ProjectService,
    private environmentService: EnvironmentService) {

    this.mode = data.mode;
    if (data.mode === "update") {
      this.id = data.obj.id;
      this.name = data.obj.name;
      this.description = data.obj.description;
    } else {
      this.name = "";
      this.description = "";
    }
  }

  ngOnInit(): void {
    if (this.mode === "update") {
      const endpoint = `${environment.objectStorageService}/default-project/environment/${this.id}/variables.yaml?timestamp=${Date.now()} `;
      this.http.get(endpoint, {responseType: 'text'})
        .subscribe((response: any) => this.code = response)
    }
  }

  onSave() {
    let dto = {
      name: this.name,
      description: this.description,
      code: this.code
    }
    if (this.mode == "update") {
      this.environmentService.saveEnvironment(this.id, dto)
        .subscribe(
          success => this.dialogRef.close(dto),
          error => this.dialogRef.close(null)
        )
    } else {
      this.projectService.selectedProject$
        .subscribe(project => {
          this.environmentService.createEnvironment(project!.id, dto)
            .subscribe(
              response => this.dialogRef.close(response),
              error => this.dialogRef.close(null)
            )
        })
    }

  }

}
