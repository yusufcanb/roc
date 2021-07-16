import {action, makeAutoObservable} from "mobx";

import services from "../services";
import {RootStore} from "./RootStore";
import {Project, ProjectModel} from "../models/Project";
import {DomainConverter} from "../models";

export class ProjectStore {
    public isLoading: boolean = true;
    public isErrored: boolean = false;

    public projects: Array<ProjectModel> = [];
    public selectedProject: string | number | null = "1";

    private root: RootStore;

    constructor(root: RootStore) {
        this.root = root;
        makeAutoObservable(this);
    }

    setProjects(projects: Array<any>) {
        this.projects = projects;
    }

    getSelectedProject() {
        if (this.projects.length > 0) {
            return this.projects.find((project: any) => project.id === this.selectedProject);
        } else {
            return null;
        }
    }

    setSelectedProject(id: string) {
        this.selectedProject = id;
    }

    getProjectById(id: string) {
        return this.projects.find((project: any) => project.id == id);
    }

    fetchProjects() {
        this.projects = []
        this.isLoading = true;
        this.isErrored = false;
        services.project.fetchProjects()
            .then(
                action("fetchSuccess", projects => {
                    projects.data.forEach((p: Project) => {
                        this.projects.push(
                            DomainConverter.fromDto<ProjectModel>(ProjectModel, p)
                        );
                    });
                    this.isLoading = false;
                    this.isErrored = false;
                }),
                action("fetchError", error => {
                    this.isErrored = true;
                    this.isLoading = false;
                })
            )

    }
}
