import {API} from './base'

export class EnvironmentApi extends API {
  async getEnvironmentsByProject(projectId: string) {
    const response = await this.http.get('/environment', {
      params: {
        projectId: projectId,
      },
    })
    return response.data
  }

  async createEnvironment(projectId: string, dto: { code: string; name: string; description: string }) {
    const requestConfig = {
      params: {
        projectId: projectId,
      },
    }

    const response = await this.http.post('/environment', dto, requestConfig)
    return response.status
  }

  async deleteEnvironment(environmentId: string) {
    const response = await this.http.delete(`/environment/${environmentId}`)
    return response.status
  }
}

