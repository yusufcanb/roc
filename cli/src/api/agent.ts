import {API} from './base'

export interface Agent {
  id: string | number
  displayName: string
}

export class AgentAPI extends API {
  async getAgentsByProject(projectId: string): Promise<Agent[]> {
    const response = await this.http.get('/agent', {
      params: {
        projectId: projectId,
      },
    })
    return response.data
  }

  async createAgent(projectId: string, name: string, os = 'Linux'): Promise<number> {
    const requestConfig = {
      params: {
        projectId: projectId,
      },
    }

    const requestData = {
      displayName: name,
      os: os,
    }

    const response = await this.http.post('/agent', requestData, requestConfig)
    return response.status
  }

  async deleteAgent(agentId: string | number): Promise<number> {
    const response = await this.http.delete(`/agent/${agentId}`)
    return response.status
  }
}
