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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,

    // Domain Modules
    ProjectModule,
    AgentModule,
    EnvironmentModule,
    TaskForceModule,
    JobModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}