import {action, makeAutoObservable} from "mobx";

import {DomainConverter} from "core/models";
import {RootStore} from "core/store/RootStore";

import {ProjectModel} from "../models/Project";
import * as services from "../services";

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

    setSelectedProject(id: string | number) {
        this.selectedProject = id;
    }

    getProjectById(id: string) {
        return this.projects.find((project: any) => project.id === id);
    }

    fetchProjects() {
        this.projects = []
        this.isLoading = true;
        this.isErrored = false;
        services.project.fetchProjects()
            .then(
                action("fetchSuccess", response => {
                    this.projects = DomainConverter.fromDtoArray<ProjectModel>(ProjectModel, response.data);
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
