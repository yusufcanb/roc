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
