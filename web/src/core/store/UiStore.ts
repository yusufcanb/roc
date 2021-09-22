import {makeAutoObservable} from "mobx";
import {Route} from "../models/Route";
import routes from "../../routes";

export class UiStore {
    title: string = "";
    onBoarding: boolean = true;
    routes: Array<Route> = routes;
    breadcrumb: Array<any> = ["ROC", "Welcome"];

    snackBarContent: any = null;

    constructor() {
        makeAutoObservable(this);
    }

    setTitle(value: string) {
        this.title = value;
    }

    setOnBoarding(value: boolean) {
        this.onBoarding = value;
    }

    setBreadcrumbState(path: string) {
        let route = this.routes.find(r => r.path === path);
        if (route) {
            this.breadcrumb.pop()
            this.breadcrumb.push(route.displayName);
        }
    }

    openSnackBar(text: string, severity: any, duration: number = 2500) {
        this.snackBarContent = {text, severity};
        setTimeout(() => {
            this.snackBarContent = null;
        }, duration)
    }

}