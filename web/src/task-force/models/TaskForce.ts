export interface TaskForce {
    name: string;
    robots: Array<string>;
}

export class TaskForceModel {
    //@ts-ignore
    private _object: TaskForce;

    get name(): string {
        return this._object.name;
    }

    get robots(): Array<string> {
        return this._object.robots
    }
}