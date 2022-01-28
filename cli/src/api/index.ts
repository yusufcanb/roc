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
import {TaskForceAPI} from './task-force'
import {ProjectAPI} from './project'
import {AgentAPI} from './agent'
import {EnvironmentApi} from './environment'
import {JobAPI} from './job'

export class ROCApi extends API {
  public project!: ProjectAPI
  public agent!: AgentAPI
  public environment!: EnvironmentApi
  public taskForce!: TaskForceAPI
  public job!: JobAPI

  constructor(baseUrl: string | null) {
    if (baseUrl) {
      super(baseUrl)
      this.setBaseUrl(baseUrl)
    }
  }

  setBaseUrl(baseUrl: string): void {
    this.project = new ProjectAPI(baseUrl)
    this.agent = new AgentAPI(baseUrl)
    this.environment = new EnvironmentApi(baseUrl)
    this.taskForce = new TaskForceAPI(baseUrl)
    this.job = new JobAPI(baseUrl)
  }
}
