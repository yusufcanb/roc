import {makeAutoObservable} from "mobx";
import {ProjectStore} from "project/store/ProjectStore";
import {FactoryStore} from "factory/store/FactoryStore";

import {TaskForceStore} from "task-force/store/TaskForce";
import {JobStore} from "job/store/JobStore";
import {RobotStore} from "robot/store/RobotStore";

export class RootStore {
    version: Array<number> = [0, 1, 0];
    title: string = "";
    isLoading: boolean = true;
    isHealthy: boolean = false;

    windowLocation = ["ROC", "Home"];

    projectStore: ProjectStore;
    jobStore: JobStore;
    taskForceStore: TaskForceStore;
    factoryStore: FactoryStore;
    robotStore: RobotStore;

    constructor() {
        makeAutoObservable(this);
        this.jobStore = new JobStore(this);
        this.taskForceStore = new TaskForceStore(this);
        this.projectStore = new ProjectStore(this);
        this.factoryStore = new FactoryStore(this);
        this.robotStore = new RobotStore(this);
    }

    setWindowLocation(loc: Array<string>) {
        this.windowLocation = loc;
    }

    setTitle(value: string) {
        this.title = value;
    }

    checkIsHealthy() {
        this.isLoading = false;
        this.isHealthy = false;
    }

}