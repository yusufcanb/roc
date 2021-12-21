import {API} from "./base";
import {ReadStream} from "fs";
import * as FormData from "form-data";


export class TaskForceAPI extends API {

  async getTaskForcesByProject(projectId: string) {

    const response = await this.http.get("/task-force", {
      params: {
        projectId: projectId
      }
    })
    return response.data
  }

  async createTaskForce(projectId: string, name: string) {
    const requestConfig = {
      params: {
        projectId: projectId
      }
    }

    const requestData = {
      displayName: name,
    }

    return this.http.post("/task-force", requestData, requestConfig)
  }

  async uploadRobotPackage(taskForceId: Id, payload: { fileName: string, stream: ReadStream }) {
    const formData: FormData = new FormData();

    formData.append('file', payload.stream);
    return this.http.post(`/task-force/${taskForceId}/package`, formData)
  }

  async executeTaskForce(taskForceId: string, environmentId: string, agentId: string) {

    const requestData = {
      agentId: agentId,
      environmentId: environmentId,
    }

    const response = await this.http.post(`/task-force/${taskForceId}/execute`, requestData)
    return response.status
  }

}


