import http from "core/services/http"
import {Project, ProjectModel} from "../models/Project";

export function fetchProjects() {
    return http.get<Array<Project>>("/projects");
}

export function fetchProjectById(id: string) {
    return http.get<Project>(`/projects/${id}`);
}

export function createProject(project: Project | ProjectModel) {
    return http.post("/projects", project);
}
