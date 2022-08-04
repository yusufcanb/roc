/*
 *   Copyright (c) 2021-2022 Yusuf Can Bayrak <yusufcanbayrak@gmail.com>
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 *   Contributors:
 *   Yusuf Can Bayrak - initial implementation and documentation.
 *
 */

import {API} from './base'
import {ReadStream} from 'fs'
import FormData from 'form-data'
import {AxiosResponse} from 'axios'
import {Job} from './job'

/**
 * Task force interface
 */
export interface TaskForce {
  id: string
  name: string
  robot: string
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
   * Makes an API call to get a task force by id
   * @param taskForceId Id of the task force
   * @returns Promise Task force with given id
   */
  async getTaskForcesById(taskForceId: string): Promise<TaskForce> {
    const response = await this.http.get<TaskForce>(`/task-force/${taskForceId}`)
    return response.data
  }

  async downloadTaskForceRobot(taskForce: TaskForce, outputPath: string): Promise<void> {
    const robotPackageUrl = taskForce.robot.replace('s3://roc', '')
    console.log(robotPackageUrl)
    await this.downloadFile(robotPackageUrl, outputPath)
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

  /**
   * Update a task force with it's id
   * @param taskForceId Identifier of the task force
   * @param dto Task force update DTO
   */
  async updateTaskForceById(taskForceId: string, dto: any): Promise<AxiosResponse<Job>> {
    return this.http.put<Job>(`/task-force/${taskForceId}`, dto)
  }

  async uploadRobotPackage(taskForceId: string | number, payload: { fileName: string, stream: ReadStream }): Promise<AxiosResponse> {
    const formData: FormData = new FormData()

    formData.append('file', payload.stream)
    formData.append('filename', payload.fileName)
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

