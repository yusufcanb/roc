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

interface Project {
  'Id': string;
  'Name': string;
  'Created At': Date;
}

export class ProjectAPI extends API {
  async getProjects(): Promise<Project[]> {
    const response = await this.http.get<Array<any>>('/project')
    const projects: Project[] = []

    for (const p of response.data) projects.push({
      Id: p.slug,
      Name: p.name,
      'Created At': new Date(p.createdAt),
    })

    return projects
  }

  async createProject(name: string): Promise<number> {
    const response = await this.http.post<Array<any>>('/project', {
      name: name,
    })

    console.debug(response.data)
    return response.status
  }
}

