import Settings from "project/views/Settings";
import ProjectList from "project/views/ProjectList";
import Factory from "factory/views/Factory";
import Jobs from "job/views/Jobs";
import TaskForce from "task-force/views/TaskForce";
import Robot from "robot/views/Robot";

import {Route} from "./core/models/Route";
import Home from "./core/views/Home";

const routes: Array<Route> = [
    {displayName: "Home", path: "/", component: Home, isExact: true},
    {
        displayName: "Projects",
        path: "/projects",
        component: ProjectList,
        children: [
            {displayName: "New Project", path: "/projects/new", component: Settings},
            {displayName: "Project Detail", path: "/projects/:id", component: Settings},
            {displayName: "Project Settings", path: "/projects/settings", component: Settings},
        ]
    },
    {displayName: "Jobs Overview", path: "/job", component: Jobs},
    {displayName: "Task Force List", path: "/task-force", component: TaskForce},
    {displayName: "Robot Repository", path: "/robot", component: Robot},
    {displayName: "Factory List", path: "/factory", component: Factory},
];

export default routes;