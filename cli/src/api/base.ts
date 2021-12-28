import axios, {AxiosInstance} from 'axios'
import fs from 'fs'
import {promisify} from 'util';

export class API {
  private readonly _http: AxiosInstance
  private readonly _s3: AxiosInstance
  private _baseUrl: string

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl
    this._http = axios.create({
      baseURL: baseUrl + '/api/v1',
    })
    this._s3 = axios.create({
      baseURL: baseUrl + '/s3/roc',
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
    const writer = fs.createWriteStream(outputLocationPath);
    const response = await this.s3.request({
      method: 'get',
      url: fileUrl,
      responseType: 'stream',
    })
    response.data.pipe(writer);
  }
}
