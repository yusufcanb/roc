import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgentSelectComponent} from './components/agent-select/agent-select.component';
import {MaterialModule} from "../material.module";
import {AgentService} from "./services/agent.service";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AgentSelectComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule
  ],
  exports: [
    AgentSelectComponent
  ],
  providers: [
    AgentService
  ]
})
export class AgentModule {
}
