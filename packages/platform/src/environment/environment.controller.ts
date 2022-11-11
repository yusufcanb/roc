import { Controller, Get, Inject } from '@nestjs/common';
import { Environment, EnvironmentRepository } from '@roc/core';

@Controller("environment")
export class EnvironmentController {

    @Inject("EnvironmentRepository") private readonly repository: EnvironmentRepository;

    @Get()
    public getEnvironments(): Environment {
        try {
            this.repository.findAll()
        } catch (err: any) {
            return Environment.fromPlainObject({ "id": 1 })
        }
    }

}
