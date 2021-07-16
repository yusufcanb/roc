import http from "./http"

export function fetchRobots() {
    return http.get("/projects");
}

export function fetchRobotById(id: string) {
    return http.get(`/projects/${id}`);
}

export default {
    fetchRobots: fetchRobots,
    fetchRobotById: fetchRobotById
}
