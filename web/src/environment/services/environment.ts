import http from "core/services/http";
import {Environment, EnvironmentDto} from "../models";

export function createEnvironment(environment: EnvironmentDto | Environment) {
    return http.post("/environments", environment);
}

export function fetchEnvironments() {
    return http.get<Array<EnvironmentDto>>("/environments");
}

export function fetchEnvironmentById(id: string | number) {
    return http.get<EnvironmentDto>(`/environments/${id}`);
}

export function deleteEnvironmentById(id: number | string) {
    return http.delete<any>(`/environments/${id}`);
}