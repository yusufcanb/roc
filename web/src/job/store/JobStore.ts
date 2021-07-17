import {makeAutoObservable} from "mobx";
import {RootStore} from "core/store/RootStore";

export class JobStore {
    isLoading: boolean = true;
    jobs: any = [];
    activeJobs = 5;

    root: RootStore;

    constructor(root: RootStore) {
        this.root = root;
        makeAutoObservable(this);
    }

    getIsEmpty() {
        return this.root.taskForceStore.getIsEmpty();
    }

}
