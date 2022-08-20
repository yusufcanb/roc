import {BaseService} from './base'

export class VariableService extends BaseService {
  async downloadVariableFileByEnvironment(environmentId: string, path: string): Promise<void> {
    throw new Error(`Not implemented. environmentId=${environmentId}&path=${path}`)
  }
}
