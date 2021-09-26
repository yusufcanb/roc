import services from "core/services";
import {TaskForce, TaskForceModel} from "../models/TaskForce";

export function fetchTaskForces(projectId?: string) {
    const requestOptions = {params: {projectId: projectId}}
    return services.http.get("/task-forces", requestOptions);
}

export function createTaskForce(taskForce: TaskForceModel | TaskForce, projectId?: string | number) {
    return services.http.post("/task-forces", {
        projectId: projectId,
        ...taskForce
    });
}
