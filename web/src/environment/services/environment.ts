import http from "core/services/http";
import {EnvironmentDto} from "../models";

export function fetchEnvironments() {
    return http.get<Array<EnvironmentDto>>("/environments");
}

export function fetchEnvironmentById(id: string | number) {
    return http.get<EnvironmentDto>(`/environments/${id}`);
}
