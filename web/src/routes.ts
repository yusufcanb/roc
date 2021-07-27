import ProjectSettingsView from "project/views/ProjectSettingsView";
import ProjectListView from "project/views/ProjectListView";
import Factory from "factory/views/FactoryListView";
import Jobs from "job/views/Jobs";
import TaskForce from "task-force/views/TaskForce";
import Robot from "robot/views/Robot";

import {Route} from "./core/models/Route";
import Home from "./core/views/Home";
import EnvironmentListView from "./environment/views/EnvironmentListView";

const routes: Array<Route> = [
    {displayName: "Home", path: "/", component: Home, isExact: true},

    {displayName: "Projects", path: "/projects", component: ProjectListView,},
    {displayName: "New Project", path: "/projects/new", component: ProjectSettingsView},
    {displayName: "Project Detail", path: "/projects/:id", component: ProjectSettingsView},
    {displayName: "Project ProjectSettingsView", path: "/projects/settings", component: ProjectSettingsView},

    {displayName: "Environment List", path: "/environments", component: EnvironmentListView},
    {displayName: "Jobs Overview", path: "/job", component: Jobs},
    {displayName: "Task Force List", path: "/task-force", component: TaskForce},
    {displayName: "Robot Repository", path: "/robot", component: Robot},
    {displayName: "Factory List", path: "/factory", component: Factory},
];

export default routes;