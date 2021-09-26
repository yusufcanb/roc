import {makeAutoObservable} from "mobx";
import {RootStore} from "core/store";
import {FileTree} from "../../project/models/Project";

export class RobotStore {
    private root: RootStore;

    public isLoading: boolean = true;
    public isErrored: boolean = false;
    public robots: Array<FileTree> = [];

    constructor(root: RootStore) {
        this.root = root;
        makeAutoObservable(this);
    }

    setRobots(projectFiles: Array<FileTree>) {
        this.robots = projectFiles.filter((file: FileTree) => file.name.endsWith("robot"))
    }

}
