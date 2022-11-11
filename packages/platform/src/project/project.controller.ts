import { Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ProjectRepository } from '@roc/core';
import { ProjectDoesNotFoundException } from './project.exception';

@Controller("project")
export class ProjectController {

    @Inject("ProjectRepository")
    private readonly repository: ProjectRepository;

    @Get()
    @HttpCode(HttpStatus.NOT_IMPLEMENTED)
    public getProjects() { }

    @Post()
    @HttpCode(HttpStatus.NOT_IMPLEMENTED)
    public createProject() { }

}

@Controller("project/:id")
export class ProjectDetailController {

    @Inject("ProjectRepository")
    private readonly repository: ProjectRepository;

    @Get()
    @HttpCode(HttpStatus.OK)
    public getProjectById(@Param('id', new ParseIntPipe()) id) {
        throw new ProjectDoesNotFoundException()
    }

    @Put()
    @HttpCode(HttpStatus.NOT_IMPLEMENTED)
    public updateProjectById(@Param('id', new ParseIntPipe()) id) {
    }

    @Delete()
    @HttpCode(HttpStatus.NOT_IMPLEMENTED)
    public deleteProjectById(@Param('id', new ParseIntPipe()) id) {
    }

}
