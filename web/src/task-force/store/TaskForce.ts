import {action, makeAutoObservable} from "mobx";
import {RootStore} from "core/store";
import {DomainConverter} from "core/models";
import {TaskForce, TaskForceModel} from "../models/TaskForce";
import * as services from "..//services";

export class TaskForceStore {
    private root: RootStore;

    isLoading: boolean = true;
    isErrored: boolean = false;

    forces: Array<TaskForce | TaskForceModel> = [];

    constructor(root: RootStore) {
        this.root = root;
        makeAutoObservable(this);
    }

    getIsEmpty() {
        return this.forces.length === 0;
    }

    fetchTaskForces() {
        this.isLoading = true;
        const {selectedProject} = this.root.projectStore;
        services.fetchTaskForces(selectedProject?.id as string)
            .then(
                action("fetchSuccess", response => {
                    this.forces = DomainConverter.fromDtoArray<TaskForceModel>(TaskForceModel, response.data);
                    this.isLoading = false;
                    this.isErrored = false;
                }),
                action("fetchError", error => {
                    this.forces = [];
                    this.isErrored = true;
                    this.isLoading = false;
                })
            )
    }

}
