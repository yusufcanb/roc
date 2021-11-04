import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectSelectComponent} from './components/project-select/project-select.component';
import {MaterialModule} from "../material.module";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    ProjectSelectComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule
  ],
  exports: [
    ProjectSelectComponent
  ]
})
export class ProjectModule {
}
