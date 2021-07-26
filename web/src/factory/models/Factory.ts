export interface Factory {
    id: string | number;
    displayName: string;
    os: string;
}

export class FactoryModel {
    //@ts-ignore
    private _object: Factory;

    constructor(id: number, displayName: string, os: string) {
        this._object = {
            id,
            displayName,
            os
        }
    }

    get id() {
        return this._object.id;
    }

    get os() {
        return this._object.os
    }

    get displayName() {
        return this._object.displayName
    }

}
