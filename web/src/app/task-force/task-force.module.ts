import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaskForceListComponent} from './components/task-force-list/task-force-list.component';
import {TaskForceListItemComponent} from './components/task-force-list-item/task-force-list-item.component';
import {TaskForceListPageComponent} from './pages/task-force-list-page/task-force-list-page.component';
import {TaskForceDetailPageComponent} from './pages/task-force-detail-page/task-force-detail-page.component';
import {TaskForceService} from "./services/task-force.service";
import {TaskForceCreatePageComponent} from './pages/task-force-create-page/task-force-create-page.component';
import {RouterModule} from "@angular/router";
import {MaterialModule} from "../material.module";
import {TaskForceIconPipe} from "./pipes/task-force-icon.pipe";
import {TaskForceSourceEditDialogComponent} from './components/task-force-source-edit-dialog/task-force-source-edit-dialog.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    TaskForceListComponent,
    TaskForceListItemComponent,

    TaskForceIconPipe,

    TaskForceListPageComponent,
    TaskForceDetailPageComponent,
    TaskForceCreatePageComponent,
    TaskForceSourceEditDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule
  ],
  providers: [
    TaskForceService
  ]
})
export class TaskForceModule {
}
