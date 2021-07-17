import http from "core/services/http"
import {Project} from "../models/Project";

export function fetchProjects() {
    return http.get<Array<Project>>("/projects");
}

export function fetchProjectById(id: string) {
    return http.get<Project>(`/projects/${id}`);
}
