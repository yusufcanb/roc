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
