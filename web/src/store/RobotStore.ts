import {makeAutoObservable} from "mobx";
import {RootStore} from "./RootStore";

export class RobotStore {
    public isLoading: boolean = true;
    public isErrored: boolean = false;

    public projects: any = [];
    public selectedProject: string | null = null;

    private root: RootStore;

    constructor(root: RootStore) {
        this.root = root;
        makeAutoObservable(this);
    }

    setProjects(projects: Array<any>) {
        this.projects = projects;
    }

    setSelectedProject(id: string) {
        this.selectedProject = id;
    }

    getProjectById(id: string) {
        return this.projects.find((project: any) => project.id == id);
    }

}
