import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgentSelectComponent} from './components/agent-select/agent-select.component';
import {MaterialModule} from "../material.module";
import {AgentService} from "./services/agent.service";
import {HttpClientModule} from "@angular/common/http";
import {AgentListPageComponent} from './pages/agent-list-page/agent-list-page.component';
import {AgentDetailPageComponent} from './pages/agent-detail-page/agent-detail-page.component';
import {RouterModule} from "@angular/router";
import {AgentListComponent} from './components/agent-list/agent-list.component';
import {AgentItemComponent} from './components/agent-item/agent-item.component';
import {AgentTypePipe} from "./agent-type.pipe";
import {DateAgoPipe} from "../core/pipes/date-ago.pipe";


@NgModule({
  declarations: [
    AgentTypePipe,
    DateAgoPipe,
    AgentSelectComponent,
    AgentListPageComponent,
    AgentDetailPageComponent,
    AgentListComponent,
    AgentItemComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    RouterModule
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
