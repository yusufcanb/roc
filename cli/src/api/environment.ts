import {API} from './base'

export interface Environment {
  id: string
  projectId: string
  name: string,
  description: string,
}

export class EnvironmentApi extends API {
  async getEnvironmentsByProject(projectId: string): Promise<any> {
    const response = await this.http.get('/environment', {
      params: {
        projectId: projectId,
      },
    })
    return response.data
  }

  async getEnvironmentById(environmentId: string): Promise<Environment> {
    const response = await this.http.get<Environment>(`/environment/${environmentId}`)
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

  async getEnvironmentVariables(environmentId: string): Promise<string> {
    const env = await this.getEnvironmentById(environmentId)
    const response = await this.s3.get(`/projects/${env.projectId}/environment/${environmentId}/variables.yaml`)
    return response.data
  }

  async deleteEnvironment(environmentId: string): Promise<number> {
    const response = await this.http.delete(`/environment/${environmentId}`)
    return response.status
  }
}
