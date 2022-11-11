import { NotFoundException } from "@nestjs/common";

export class ProjectDoesNotFoundException extends NotFoundException {
    constructor() {
        super('Project does not exists');
    }
}