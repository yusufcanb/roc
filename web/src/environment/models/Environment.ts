import {VariableDto} from "./Variable";

export interface EnvironmentDto {
    name: string;
    createdAt: string;
    updatedAt: string;
    variables: Array<VariableDto>;
}

export class Environment {
    //@ts-ignore
    private _object: EnvironmentDto;

    get name() {
        return this._object.name;
    }

    get variables() {
        return this._object.name;
    }
}