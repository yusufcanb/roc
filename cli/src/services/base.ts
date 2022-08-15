import {ROCApi} from '../api'

export abstract class BaseService {
  api: ROCApi

  constructor(platformUrl: string) {
    this.api = new ROCApi(platformUrl)
  }

}
