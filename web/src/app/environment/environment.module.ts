import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EnvironmentSelectComponent} from './components/environment-select/environment-select.component';
import {MaterialModule} from "../material.module";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    EnvironmentSelectComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule
  ],
  exports: [
    EnvironmentSelectComponent
  ],
})
export class EnvironmentModule {
}
