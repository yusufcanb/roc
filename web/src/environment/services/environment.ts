import http from "core/services/http";
import {Environment, EnvironmentDto} from "../models";

export function createEnvironment(projectId: string | number, environment: EnvironmentDto | Environment) {
    return http.post("/environments", {projectId: projectId, ...environment});
}

export function fetchEnvironments(projectId?: number | string) {
    const params = {
        projectId: projectId
    }
    return http.get<Array<EnvironmentDto>>("/environments", {params: params});
}

export function fetchEnvironmentById(id: string | number) {
    return http.get<EnvironmentDto>(`/environments/${id}`);
}

export function deleteEnvironmentById(id: number | string) {
    return http.delete<any>(`/environments/${id}`);
}