import {makeAutoObservable} from "mobx";


export class RootStore {
    version: Array<number> = [0, 1, 0];
    isLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

}