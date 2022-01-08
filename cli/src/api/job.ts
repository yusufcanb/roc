import {API} from './base'
import {AxiosResponse} from 'axios'
import open from 'open'

export interface Job {
  id: string
  projectId: string
  status: string
}

export class JobModel {
  private id: string;
  private status: string;

  constructor(obj: Job) {
    this.id = obj.id
    this.status = obj.status
  }

  reportAvailable(): boolean {
    return this.status === 'SUCCESS' || this.status === 'FAIL'
  }

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

  async getJobById(projectId: string | number) {
    return this.http.get<Job>(`/job/${projectId}`)
  }

  async getJobReportById(id: string | number) {
    return open(`${this.baseUrl}/s3/roc/projects/1/job/${id}/report.html`)
  }

}
