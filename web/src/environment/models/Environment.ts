import {VariableDto} from "./Variable";

export interface EnvironmentDto {
    id: string | number;
    name: string;
    createdAt: string;
    updatedAt: string;
    variables: Array<VariableDto>;
}

export class Environment {
    //@ts-ignore
    private _object: EnvironmentDto;

    get id() {
        return this._object.id;
    }

    get name() {
        return this._object.name;
    }

    get variables() {
        return this._object.name;
    }
}