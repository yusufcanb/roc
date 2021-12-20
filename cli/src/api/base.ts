import axios, {AxiosInstance} from "axios"

export class API {
  private _http: AxiosInstance
  private _baseUrl: string

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl
    this._http = axios.create({
      baseURL: baseUrl
    })
  }

  get http(): AxiosInstance {
    return this._http;
  }

}
