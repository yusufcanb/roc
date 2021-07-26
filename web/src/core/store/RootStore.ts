import {makeAutoObservable} from "mobx";
import {ProjectStore} from "project/store/ProjectStore";
import {FactoryStore} from "factory/store/FactoryStore";

import {TaskForceStore} from "task-force/store/TaskForce";
import {JobStore} from "job/store/JobStore";
import {RobotStore} from "robot/store/RobotStore";
import {EnvironmentStore} from "../../environment/store/EnvironmentStore";
import {Route} from "../models/Route";
import routes from "../../routes";

export class RootStore {
    version: Array<number> = [0, 1, 0];
    title: string = "";
    onBoarding: boolean = true;
    routes: Array<Route> = routes

    windowLocation = ["ROC", "Home"];
    breadcrumb: Array<string> = ["ROC", "Welcome"]

    projectStore: ProjectStore;
    jobStore: JobStore;
    taskForceStore: TaskForceStore;
    factoryStore: FactoryStore;
    robotStore: RobotStore;
    environmentStore: EnvironmentStore

    constructor() {
        makeAutoObservable(this);
        this.jobStore = new JobStore(this);
        this.taskForceStore = new TaskForceStore(this);
        this.projectStore = new ProjectStore(this);
        this.factoryStore = new FactoryStore(this);
        this.robotStore = new RobotStore(this);
        this.environmentStore = new EnvironmentStore(this);
    }

    setWindowLocation(loc: Array<string>) {
        this.windowLocation = loc;
    }

    setTitle(value: string) {
        this.title = value;
    }

    setOnBoarding(value: boolean) {
        this.onBoarding = value;
    }

    setBreadcrumbState(path: string) {
        let route = this.routes.find(r => r.path == path);
        if (route) {
            this.breadcrumb.pop()
            this.breadcrumb.push(route.displayName);
        }
    }

}