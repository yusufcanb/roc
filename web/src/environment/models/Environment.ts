import {Variable, VariableDto} from "./Variable";

export interface EnvironmentDto {
    id: string | number;
    name: string;
    createdAt: string;
    updatedAt: string;
    variables: Array<VariableDto>;
}

export class Environment {
    //@ts-ignore
    private _object: EnvironmentDto = {};

    constructor(name: string, variables: Array<Variable | VariableDto> = []) {
        this._object.name = name;
        this._object.variables = [];
    }

    get id() {
        return this._object.id;
    }

    get name() {
        return this._object.name;
    }

    get variables() {
        return this._object.variables;
    }
}