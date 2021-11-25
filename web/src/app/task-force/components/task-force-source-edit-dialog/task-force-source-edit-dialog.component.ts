import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MatRadioChange} from "@angular/material/radio";
import {TaskForceService} from "../../services/task-force.service";
import {ProjectService} from "../../../project/services/project.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TaskForce} from "../../task-force.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Id} from "../../../../types";

@Component({
  selector: 'roc-task-force-source-edit-dialog',
  templateUrl: './task-force-source-edit-dialog.component.html',
  styleUrls: ['./task-force-source-edit-dialog.component.scss']
})
export class TaskForceSourceEditDialogComponent implements OnInit {

  @ViewChild('robotFile') robotFile!: ElementRef;

  isUploading = false;
  id: Id;

  sourceType: string = "repository";
  repositoryUrl: string = "";


  constructor(
    private dialogRef: MatDialogRef<TaskForceSourceEditDialogComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: TaskForce,
    public projectService: ProjectService,
    public taskForceService: TaskForceService) {

    this.id = data.id;
    this.sourceType = data.sourceType;
    this.repositoryUrl = data.repositoryUrl;

  }

  ngOnInit(): void {
  }

  onSourceTypeChanged($event: MatRadioChange) {
    this.sourceType = $event.value;
    this.repositoryUrl = "";
  }

  onPackageUploadClicked($event: any) {
    this.robotFile.nativeElement.click();
  }

  onFileChange(e: Event) {
    const target = e.target as any;
    const file = target.files[0] as File
    this.isUploading = true;
    this.repositoryUrl = "please wait while package uploading...";
    this.taskForceService.uploadPackage(this.id, file)
      .subscribe(
        success => console.log(success),
        fail => console.log(fail),
        () => {
          this.isUploading = false;
          this.repositoryUrl = file.name;
        }
      )
  }

  onInstallClicked() {
    const updateData: Partial<TaskForce> = {
      sourceType: this.sourceType,
      repositoryUrl: this.repositoryUrl
    };
    this.taskForceService.updateTaskForce(this.id, updateData)
      .subscribe(data => {
        this.snackBar.open("Package successfully updated", "", {duration: 2500});
        this.dialogRef.close({
          success: true,
          data: {
            sourceType: this.sourceType,
            repositoryUrl: this.repositoryUrl,
            packageUrl: data.packageUrl
          }
        });
      })
  }

}
