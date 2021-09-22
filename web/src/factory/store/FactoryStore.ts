import {action, makeAutoObservable} from "mobx";
import {RootStore} from "core/store";

import {FactoryModel} from "factory/models/Factory";
import {DomainConverter, Nullable} from "core/models";

import  * as services from "factory/services";

export class FactoryStore {
    private root: RootStore;

    factories: Array<FactoryModel> = [];
    selectedFactory: Nullable<FactoryModel>;
    isLoading: boolean = true;
    isErrored: boolean = false;

    constructor(root: RootStore) {
        this.root = root;
        makeAutoObservable(this);
    }

    setSelectedFactory(factoryId: string | number) {
        this.selectedFactory = this.factories.find(factory => factory.id === factoryId);
    }

    fetchFactories() {
        this.isLoading = true;
        services.factory.fetchFactories(this.root.projectStore.selectedProject?.id)
            .then(
                action("fetchSuccess", response => {
                    this.factories = DomainConverter.fromDtoArray<FactoryModel>(FactoryModel, response.data);
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
