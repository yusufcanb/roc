import {action, makeAutoObservable} from "mobx";

import {DomainConverter} from "core/models";
import {RootStore} from "core/store/RootStore";

import * as services from "../services";
import {Environment} from "../models";

export class EnvironmentStore {
    private root: RootStore;

    public isLoading: boolean = true;
    public isErrored: boolean = false;

    public environments: Array<Environment> = [];
    public selectedEnvironment: string | number | null = null;

    constructor(root: RootStore) {
        this.root = root;
        makeAutoObservable(this);
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
}
