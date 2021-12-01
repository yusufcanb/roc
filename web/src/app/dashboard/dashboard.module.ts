import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardPageComponent} from './pages/dashboard-page/dashboard-page.component';
import {OnBoardingDialogComponent} from './components/on-boarding-dialog/on-boarding-dialog.component';
import {MaterialModule} from "../material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    DashboardPageComponent,
    OnBoardingDialogComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class DashboardModule {
}
