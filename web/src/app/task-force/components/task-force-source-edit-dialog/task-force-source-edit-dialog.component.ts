import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatRadioChange} from "@angular/material/radio";

@Component({
  selector: 'roc-task-force-source-edit-dialog',
  templateUrl: './task-force-source-edit-dialog.component.html',
  styleUrls: ['./task-force-source-edit-dialog.component.scss']
})
export class TaskForceSourceEditDialogComponent implements OnInit {


  @ViewChild('robotFile') robotFile!: ElementRef;

  sourceType: string = "package";
  sourceUrl: string = "";

  constructor() {
  }

  ngOnInit(): void {
  }

  onSourceTypeChanged($event: MatRadioChange) {
    this.sourceType = $event.value;
    this.sourceUrl = "";
  }

  onPackageUploadClicked($event: any) {
    this.robotFile.nativeElement.click();
  }

  onFileChange(e: Event) {
    const target = e.target as any;
    const file = target.files[0] as File
    this.sourceUrl = file.name;
  }

}
