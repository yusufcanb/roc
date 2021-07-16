import http from "./http"
import {Project} from "../models/Project";

export function fetchProjects() {
    return http.get<Array<Project>>("/projects");
}

export function fetchProjectById(id: string) {
    return http.get<Project>(`/projects/${id}`);
}

export default {
    fetchProjects: fetchProjects,
    fetchProjectById: fetchProjectById
}
