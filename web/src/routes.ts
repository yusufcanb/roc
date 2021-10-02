import ProjectSettingsView from "project/views/ProjectSettingsView";
import ProjectListView from "project/views/ProjectListView";
import Factory from "factory/views/FactoryListView";
import Jobs from "job/views/Jobs";
import TaskForce from "task-force/views/TaskForceListView";
import Robot from "robot/views/Robot";

import {Route} from "./core/models/Route";
import Home from "./core/views/Home";
import EnvironmentListView from "./environment/views/EnvironmentListView";
import ProjectCreateView from "./project/views/ProjectCreateView";
import TaskForceCreateView from "./task-force/views/TaskForceCreateView";
import EnvironmentDetailView from "./environment/views/EnvironmentDetailView";
import EnvironmentCreateView from "./environment/views/EnvironmentCreateView";
import TaskForceDetailView from "./task-force/views/TaskForceDetailView";

const routes: Array<Route> = [
    {displayName: "Home", path: "/", component: Home, isExact: true},
    {displayName: "Projects", path: "/projects", component: ProjectListView, isExact: true},
    {displayName: "New Project", path: "/projects/new", component: ProjectCreateView},
    {displayName: "Project Detail", path: "/projects/:id", component: ProjectSettingsView},
    {displayName: "Project Settings", path: "/projects/settings", component: ProjectSettingsView},
    {displayName: "Environment List", path: "/environments", component: EnvironmentListView, isExact: true},
    {displayName: "Environment Create", path: "/environments/new", component: EnvironmentCreateView},
    {displayName: "Environment Detail", path: "/environments/:environmentId", component: EnvironmentDetailView},
    {displayName: "Jobs Overview", path: "/job", component: Jobs},
    {displayName: "Task Force List", path: "/task-force", component: TaskForce, isExact: true},
    {displayName: "Task Force Create", path: "/task-force/new", component: TaskForceCreateView},
    {displayName: "Task Force Detail", path: "/task-force/:taskForceId", component: TaskForceDetailView},
    {displayName: "Robot Repository", path: "/robot", component: Robot},
    {displayName: "Factory List", path: "/factory", component: Factory},
];

export default routes;