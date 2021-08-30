export interface TaskForce {
    id: string;
    name: string;
    robots: Array<string>;
}

export class TaskForceModel {
    //@ts-ignore
    private _object: TaskForce;

    get id(): string {
        return this._object.id;
    }

    get name(): string {
        return this._object.name;
    }

    get robots(): Array<string> {
        return this._object.robots
    }
}