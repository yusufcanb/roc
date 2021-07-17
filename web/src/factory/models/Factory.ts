export interface Factory {
    id: string | number;
    name: string;
    os: string;
}

export class FactoryModel {
    //@ts-ignore
    private _object: Factory;

    constructor(id: number, name: string, os: string) {
        this._object = {
            id,
            name,
            os
        }
    }

    get id() {
        return this._object.id;
    }

    get name() {
        return this._object.name
    }

    get os() {
        return this._object.os
    }

}
