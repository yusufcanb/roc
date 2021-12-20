import {API} from "./base";

export class AgentAPI extends API {

  async getAgentsByProject(projectId: string) {
    const response = await this.http.get("/agent", {
      params: {
        projectId: projectId
      }
    })
    return response.data
  }

  async createAgent(projectId: string, name: string, os: string = "Linux") {
    const requestConfig = {
      params: {
        projectId: projectId
      }
    }

    const requestData = {
      displayName: name,
      os: os
    }

    const response = await this.http.post("/agent", requestData, requestConfig)
    return response.status
  }

}
