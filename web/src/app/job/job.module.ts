import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JobListPageComponent} from './pages/job-list-page/job-list-page.component';
import {JobDetailPageComponent} from './pages/job-detail-page/job-detail-page.component';
import {HttpClientModule} from "@angular/common/http";
import {JobService} from "./services/job.service";
import {MaterialModule} from "../material.module";
import {JobStatusPipe} from "./pipes/job-status.pipe";
import {JobStatusColorPipe} from "./pipes/job-status-color.pipe";


@NgModule({
  declarations: [
    JobListPageComponent,
    JobDetailPageComponent,
    JobStatusPipe,
    JobStatusColorPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    JobService
  ]
})
export class JobModule {
}
