import {action, makeAutoObservable} from "mobx";

import {DomainConverter, Nullable} from "core/models";
import {RootStore} from "core/store/RootStore";

import * as services from "../services";
import {Environment, EnvironmentDto} from "../models";

export class EnvironmentStore {
    private root: RootStore;

    public isLoading: boolean = true;
    public isErrored: boolean = false;

    public environments: Array<Environment> = [];
    public selectedEnvironment: Nullable<Environment> = null;

    constructor(root: RootStore) {
        this.root = root;
        makeAutoObservable(this);
    }

    setSelectedEnvironment(id: string | number) {
        this.selectedEnvironment = this.environments.find(e => e.id === id);
    }

    fetchEnvironments() {
        this.environments = []
        this.isLoading = true;
        this.isErrored = false;
        services.environment.fetchEnvironments()
            .then(
                action("fetchSuccess", response => {
                    this.environments = DomainConverter.fromDtoArray<Environment>(Environment, response.data);
                    this.isLoading = false;
                    this.isErrored = false;
                }),
                action("fetchError", error => {
                    this.isErrored = true;
                    this.isLoading = false;
                })
            )
    }


    getEnvironmentById(environmentId: string) {
        return this.environments.find(e => e.id == parseInt(environmentId));
    }

    saveEnvironment(environment: Environment | EnvironmentDto) {
        return services.environment.createEnvironment(environment);
    }

    createEnvironment(environment: Environment) {
        return services.environment.createEnvironment(DomainConverter.toDto(environment));
    }

    updateEnvironment(id: string | number, environment: Environment) {
    }

    deleteEnvironment(id: string | number) {
        services.environment.deleteEnvironmentById(id)
            .then(
                action("deleteSuccess", response => {
                    if (response.status < 400) {
                        this.environments.splice(this.environments.findIndex(e => e.id === id), 1);
                    }
                }),
                action("deleteFailed", response => {
                }),
            );
    }

}
