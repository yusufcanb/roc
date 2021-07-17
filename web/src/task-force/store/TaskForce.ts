import {makeAutoObservable} from "mobx";
import {RootStore} from "core/store";

export class TaskForceStore {
    isLoading: boolean = true;
    isErrored: boolean = false;

    forces: any = [];

    constructor(root: RootStore) {
        makeAutoObservable(this);
    }

    getIsEmpty() {
        return this.forces.length == 0;
    }

}
