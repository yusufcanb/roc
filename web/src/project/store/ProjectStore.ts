import {action, makeAutoObservable} from "mobx";

import {DomainConverter, Nullable} from "core/models";
import {RootStore} from "core/store/RootStore";

import {Project, ProjectModel} from "../models/Project";
import * as projectApi from "../services/project";


export class ProjectStore {
    public isLoading: boolean = true;
    public isErrored: boolean = false;

    public projects: Array<ProjectModel | Project> = [];
    public selectedProject: Nullable<Project> = null;

    private root: RootStore;

    constructor(root: RootStore) {
        this.root = root;
        makeAutoObservable(this);
    }

    fetchProjects() {
        this.projects = []
        this.isLoading = true;
        this.isErrored = false;
        return projectApi.fetchProjects()
            .then(
                action("fetchSuccess", response => {
                    this.projects = DomainConverter.fromDtoArray<ProjectModel>(ProjectModel, response.data);
                    this.isLoading = false;
                    this.isErrored = false;
                    if (this.selectedProject === null) {
                        this.selectedProject = this.projects[0];
                        this.root.robotStore.setRobots(this.selectedProject.files);
                    }
                }),
                action("fetchError", error => {
                    this.isErrored = true;
                    this.isLoading = false;
                })
            )
    }

    createProject(project: Partial<Project>) {
        projectApi.createProject(project as Project)
            .then(
                action("createSuccess", response => {
                    this.projects.push(project as Project);
                    this.isLoading = false;
                    this.isErrored = false;
                    this.root.uiStore.openSnackBar("Project created successfully", "success");
                }),
                action("createFail", () => {
                    this.isErrored = true;
                    this.isLoading = false;
                })
            )
    }

    setProjects(projects: Array<any>) {
        this.projects = projects;
    }

    getSelectedProject() {
        return this.selectedProject;
    }

    setSelectedProject(id: string | number) {
        this.selectedProject = this.projects.find(p => p.id === id);
        this.root.uiStore.setOnBoarding(true);
        this.root.environmentStore.fetchEnvironments();
        this.root.factoryStore.fetchFactories();
        this.root.taskForceStore.fetchTaskForces();
        this.root.robotStore.setRobots(this.selectedProject?.files ?? []);
        setTimeout(() => {
            this.root.uiStore.setOnBoarding(false);
        }, 5000)
    }

    getProjectById(id: string) {
        return this.projects.find((project: any) => project.id === id);
    }

}
