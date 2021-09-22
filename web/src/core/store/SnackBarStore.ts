import {makeAutoObservable} from "mobx";

export class SnackBarStore {
    snackBarContent: any = null;

    constructor() {
        makeAutoObservable(this);
    }

    openSnackBar(text: string, severity: any, duration: number = 2500) {
        this.snackBarContent = {text, severity};
        setTimeout(() => {
            this.snackBarContent = null;
        }, duration)
    }

}