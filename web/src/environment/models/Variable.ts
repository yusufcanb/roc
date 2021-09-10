export interface VariableDto {
    key: string;
    value: string;
    description: string;
    encrypted: boolean;
}

export class Variable {
    constructor(key: string, value: string, description?: string) {
    }
}