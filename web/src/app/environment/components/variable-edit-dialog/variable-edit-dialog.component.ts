import {Component, Inject, OnInit} from '@angular/core';
import {EnvironmentService} from "../../services/environment.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Environment} from "../../environment.model";
import {Id} from "../../../../types";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'roc-variable-edit-dialog',
  templateUrl: './variable-edit-dialog.component.html',
  styleUrls: ['./variable-edit-dialog.component.scss']
})
export class VariableEditDialogComponent implements OnInit {
  editorOptions = {
    language: 'yaml'
  };

  id: Id;
  name: string;
  description: string;
  code: string = '# Define your environment variables here in YAML format,\n# they will be assigned in job runtime.';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Environment,
    public dialogRef: MatDialogRef<VariableEditDialogComponent>,
    private http: HttpClient,
    private environmentService: EnvironmentService) {

    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
  }

  ngOnInit(): void {
    const endpoint = `${environment.objectStorageService}/default-project/environment/${this.id}/variables.yaml`;
    this.http.get(endpoint, {responseType: 'text'})
      .subscribe((response: any) => this.code = response)
  }

  onSave() {
    let dto = {
      name: this.name,
      description: this.description,
      code: this.code
    }
    this.environmentService.saveEnvironment(this.id, dto)
      .subscribe(
        success => this.dialogRef.close(dto),
        error => this.dialogRef.close(null)
      )
  }

}
