import {makeAutoObservable} from "mobx";
import {JobStore} from "./JobStore";
import {TaskForceStore} from "./TaskForce";
import {ProjectStore} from "./ProjectStore";

export class RootStore {
    version: Array<number> = [0, 1, 0];
    title: string = "";
    isLoading: boolean = true;
    isHealthy: boolean = false;

    windowLocation = ["ROC", "Home"];

    projectStore: ProjectStore;
    jobStore: JobStore;
    taskForceStore: TaskForceStore;

    constructor() {
        makeAutoObservable(this);
        this.jobStore = new JobStore(this);
        this.taskForceStore = new TaskForceStore(this);
        this.projectStore = new ProjectStore(this);
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