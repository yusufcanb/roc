import {API} from './base'
import {ReadStream} from 'fs'
import FormData from 'form-data'
import {AxiosResponse} from 'axios'

export interface TaskForce {
  id: string
  name: string
  sourceType: string
  repositoryUrl: string
  bucketName: string
  packageUrl: string
}

export class TaskForceAPI extends API {
  /**
   * Makes an API call to fetch all the task force entities of the given project
   * @param projectId Project identifier
   * @returns Promise of task forces list
   */
  async getTaskForcesByProject(projectId: string): Promise<TaskForce[]> {
    const response = await this.http.get<TaskForce[]>('/task-force', {
      params: {
        projectId: projectId,
      },
    })
    return response.data
  }

  /**
   * Makes an API call to create new task force
   * @param projectId Project id
   * @param name Name of the task force to be created
   * @returns AxiosResponse response of the request
   */
  async createTaskForce(projectId: string, name: string): Promise<AxiosResponse> {
    const requestConfig = {
      params: {
        projectId: projectId,
      },
    }

    const requestData = {
      name: name,
    }

    return this.http.post('/task-force', requestData, requestConfig)
  }

  async uploadRobotPackage(taskForceId: string | number, payload: { fileName: string, stream: ReadStream }): Promise<AxiosResponse<any>> {
    const formData: FormData = new FormData()

    formData.append('file', payload.stream)
    return this.http.post(`/task-force/${taskForceId}/package`, formData, {
      headers: formData.getHeaders(),
    })
  }

  async executeTaskForce(taskForceId: string, environmentId: string, agentId: string): Promise<number> {
    const requestData = {
      agentId: agentId,
      environmentId: environmentId,
    }

    const response = await this.http.post(`/task-force/${taskForceId}/execute`, requestData)
    return response.status
  }

  async deleteTaskForceById(taskForceId: string | number): Promise<AxiosResponse> {
    return this.http.delete(`/task-force/${taskForceId}`)
  }
}

