import {API} from './base'

export class JobAPI extends API {
  async getJobsByProject(projectId: string | number) {
    const requestConfig = {
      params: {
        projectId: projectId,
      },
    }

    return this.http.get('/job', requestConfig)
  }
}
