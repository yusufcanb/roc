import {makeAutoObservable} from "mobx";
import {ProjectStore} from "project/store/ProjectStore";
import {FactoryStore} from "factory/store/FactoryStore";

import {TaskForceStore} from "task-force/store/TaskForce";
import {JobStore} from "job/store/JobStore";
import {RobotStore} from "robot/store/RobotStore";
import {EnvironmentStore} from "../../environment/store/EnvironmentStore";
import {UiStore} from "./UiStore";

export class RootStore {
    version: Array<number> = [0, 1, 0];

    uiStore: UiStore;

    projectStore: ProjectStore;
    jobStore: JobStore;
    taskForceStore: TaskForceStore;
    factoryStore: FactoryStore;
    robotStore: RobotStore;
    environmentStore: EnvironmentStore;

    constructor() {
        makeAutoObservable(this);
        this.uiStore = new UiStore();

        this.jobStore = new JobStore(this);
        this.taskForceStore = new TaskForceStore(this);
        this.projectStore = new ProjectStore(this);
        this.factoryStore = new FactoryStore(this);
        this.robotStore = new RobotStore(this);
        this.environmentStore = new EnvironmentStore(this);
    }

}