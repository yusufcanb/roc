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

import axios, {AxiosInstance} from 'axios'
import fs from 'fs'

export class API {
  private readonly _http: AxiosInstance
  private readonly _s3: AxiosInstance
  private readonly _baseUrl: string

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl
    this._http = axios.create({
      baseURL: baseUrl + '/api/v1',
    })

    this._s3 = axios.create({
      baseURL: baseUrl + '/s3',
    })
  }

  get baseUrl(): string {
    return this._baseUrl
  }

  get http(): AxiosInstance {
    return this._http
  }

  get s3(): AxiosInstance {
    return this._s3
  }

  async downloadFile(fileUrl: string, outputLocationPath: string): Promise<void> {
    const writer = fs.createWriteStream(outputLocationPath)
    const response = await this.s3.request({
      method: 'get',
      url: fileUrl,
      responseType: 'stream',
    })
    response.data.pipe(writer)
  }
}
