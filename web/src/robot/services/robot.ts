import http from "../../core/services/http"

export function fetchRobots(projectId: string) {
    return http.get("/projects");
}

export function fetchRobotById(projectId: string, id: string) {
    return http.get(`/projects/${id}`);
}

export default {
    fetchRobots: fetchRobots,
    fetchRobotById: fetchRobotById
}
