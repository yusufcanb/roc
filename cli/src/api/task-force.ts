import {API} from "./base";


export class TaskForceAPI extends API {

  async getTaskForcesByProject(projectId: string) {

    const response = await this.http.get("/task-force", {
      params: {
        projectId: projectId
      }
    })
    return response.data
  }

  async createTaskForce(projectId: string, name: string, type: string, url: string) {
    const requestConfig = {
      params: {
        projectId: projectId
      }
    }

    const requestData = {
      displayName: name,
    }

    const response = await this.http.post("/task-force", requestData, requestConfig)
    return response.status
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


