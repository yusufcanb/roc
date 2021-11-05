import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EnvironmentSelectComponent} from './components/environment-select/environment-select.component';
import {MaterialModule} from "../material.module";
import {HttpClientModule} from "@angular/common/http";
import {EnvironmentDetailPageComponent} from './pages/environment-detail-page/environment-detail-page.component';
import {RouterModule} from "@angular/router";
import {EnvironmentListPageComponent} from './pages/environment-list-page/environment-list-page.component';
import {EnvironmentListComponent} from './components/environment-list/environment-list.component';
import {EnvironmentListItemComponent} from './components/environment-list-item/environment-list-item.component';


@NgModule({
  declarations: [
    EnvironmentSelectComponent,
    EnvironmentDetailPageComponent,
    EnvironmentListPageComponent,
    EnvironmentListComponent,
    EnvironmentListItemComponent
  ],
    imports: [
        CommonModule,
        HttpClientModule,
        MaterialModule,
        RouterModule
    ],
  exports: [
    EnvironmentSelectComponent
  ],
})
export class EnvironmentModule {
}
