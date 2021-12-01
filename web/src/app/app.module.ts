import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {HeaderComponent} from "./core/components/header/header.component";
import {ProjectModule} from "./project/project.module";
import {AgentModule} from "./agent/agent.module";
import {EnvironmentModule} from "./environment/environment.module";
import {JobModule} from "./job/job.module";
import {TaskForceModule} from "./task-force/task-force.module";
import {DashboardModule} from "./dashboard/dashboard.module";
import {NavService} from "./core/services/nav.service";
import {DefaultLayoutComponent} from "./core/components/default-layout/default-layout.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}


@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    DashboardModule,


    // Domain Modules
    ProjectModule,
    AgentModule,
    EnvironmentModule,
    TaskForceModule,
    JobModule,

  ],
  providers: [NavService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
