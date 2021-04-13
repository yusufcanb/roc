import {action, makeAutoObservable} from "mobx";


export class RootStore {
    version: Array<number> = [0, 1, 0];
    title: string = "";
    isLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setTitle(value: string) {
        this.title = value;
    }

}