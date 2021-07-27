import services from "core/services";

export function fetchTaskForces(projectId?: string) {
    const requestOptions = {params: {projectId: projectId}}
    return services.http.get("/task-forces", requestOptions);
}