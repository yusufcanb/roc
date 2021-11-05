import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardPageComponent} from "./dashboard/pages/dashboard-page/dashboard-page.component";
import {AgentListPageComponent} from "./agent/pages/agent-list-page/agent-list-page.component";
import {EnvironmentListPageComponent} from "./environment/pages/environment-list-page/environment-list-page.component";
import {ProjectListPageComponent} from "./project/pages/project-list-page/project-list-page.component";
import {ProjectDetailPageComponent} from "./project/pages/project-detail-page/project-detail-page.component";
import {DefaultLayoutComponent} from "./core/components/default-layout/default-layout.component";
import {AgentDetailPageComponent} from "./agent/pages/agent-detail-page/agent-detail-page.component";
import {EnvironmentDetailPageComponent} from "./environment/pages/environment-detail-page/environment-detail-page.component";

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
    component: DefaultLayoutComponent,
    children: [
      {
        path: "",
        component: ProjectListPageComponent
      },
      {
        path: "detail",
        component: ProjectDetailPageComponent
      }
    ]
  },
  {
    path: "agent",
    component: DefaultLayoutComponent,
    children: [
      {
        path: "",
        component: AgentListPageComponent
      },
      {
        path: "detail",
        component: AgentDetailPageComponent
      }
    ]
  },
  {
    path: "environment",
    component: DefaultLayoutComponent,
    children: [
      {
        path: "",
        component: EnvironmentListPageComponent,
      },
      {
        path: "detail",
        component: EnvironmentDetailPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
