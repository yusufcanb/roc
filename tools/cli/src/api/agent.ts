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
