import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectSelectComponent} from './components/project-select/project-select.component';
import {MaterialModule} from "../material.module";
import {HttpClientModule} from "@angular/common/http";
import {ProjectListPageComponent} from './pages/project-list-page/project-list-page.component';
import {ProjectListComponent} from './component/project-list/project-list.component';
import {ProjectListItemComponent} from './component/project-list-item/project-list-item.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    ProjectSelectComponent,
    ProjectListPageComponent,
    ProjectListComponent,
    ProjectListItemComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MaterialModule,
  ],
  exports: [
    ProjectSelectComponent
  ]
})
export class ProjectModule {
}
