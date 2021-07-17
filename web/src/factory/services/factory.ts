import http from "core/services/http"
import {Factory} from "factory/models/Factory";


export function fetchFactories() {
    return http.get<Array<Factory>>("/factories");
}

export function fetchFactoryById(id: string) {
    return http.get<Factory>(`/factories/${id}`);
}

export default {
    fetchFactories: fetchFactories,
    fetchFactoryById: fetchFactoryById
}
