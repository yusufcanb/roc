import {API} from './base'
import {AxiosResponse} from 'axios'

export interface Job {
  id: string
}

export class JobAPI extends API {
  async getJobsByProject(projectId: string | number): Promise<AxiosResponse> {
    const requestConfig = {
      params: {
        projectId: projectId,
      },
    }
    return this.http.get<Job[]>('/job', requestConfig)
  }
}
