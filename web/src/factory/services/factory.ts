import http from "core/services/http"

import {Factory} from "factory/models/Factory";

export function fetchFactories(projectId?: string | number) {
    const params = {
        projectId: projectId ?? 1
    }
    return http.get<Array<Factory>>("/factory", {params: params});
}

export function fetchFactoryById(id: string) {
    return http.get<Factory>(`/factory/${id}`);
}
