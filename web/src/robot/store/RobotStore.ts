import {makeAutoObservable} from "mobx";
import {RootStore} from "core/store";

export class RobotStore {
    private root: RootStore;

    public isLoading: boolean = true;
    public isErrored: boolean = false;
    public robots: any = [];

    constructor(root: RootStore) {
        this.root = root;
        makeAutoObservable(this);
    }

}
