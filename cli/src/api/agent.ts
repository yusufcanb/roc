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
import JSONbig from 'json-bigint'

export interface Agent {
  id?: string | number;
  name: string;
  hostName: string;
  platform: string;
  arch: string;
  version: string;
  dockerVersion: string;
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

  async createAgent(agent: Agent): Promise<Agent> {
    const requestConfig = {
      transformResponse: [(data: any) => data],
    }

    const requestData = {
      ...agent,
    }

    const response = await this.http.post('/agent', requestData, requestConfig)
    return JSONbig.parse(response.data)
  }

  async deleteAgent(agentId: string | number): Promise<number> {
    const response = await this.http.delete(`/agent/${agentId}`)
    return response.status
  }

  async heartBeat(agentId: string | number): Promise<any> {
    const response = await this.http.post(`/agent/${agentId}/health-check`)
    return response.status
  }
}
