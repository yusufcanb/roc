import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardPageComponent} from "./dashboard/pages/dashboard-page/dashboard-page.component";
import {AgentListPageComponent} from "./agent/pages/agent-list-page/agent-list-page.component";
import {EnvironmentListPageComponent} from "./environment/pages/environment-list-page/environment-list-page.component";
import {ProjectListPageComponent} from "./project/pages/project-list-page/project-list-page.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: 'full',
    redirectTo: "dashboard"
  },
  {
    path: "dashboard",
    component: DashboardPageComponent,
  },
  {
    path: "project",
    component: ProjectListPageComponent,
  },
  {
    path: "agent",
    component: AgentListPageComponent
  },
  {
    path: "environment",
    component: EnvironmentListPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
