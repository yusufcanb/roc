import {API} from './base'

export class EnvironmentApi extends API {
  async getEnvironmentsByProject(projectId: string): Promise<any> {
    const response = await this.http.get('/environment', {
      params: {
        projectId: projectId,
      },
    })
    return response.data
  }

  async createEnvironment(projectId: string, dto: { code: string; name: string; description: string }): Promise<number> {
    const requestConfig = {
      params: {
        projectId: projectId,
      },
    }

    const response = await this.http.post('/environment', dto, requestConfig)
    return response.status
  }

  async deleteEnvironment(environmentId: string): Promise<number> {
    const response = await this.http.delete(`/environment/${environmentId}`)
    return response.status
  }
}
