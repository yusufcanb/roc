import os from 'os'
import {BaseService} from './base'
import {ROC_CLI_VERSION} from '../index'

export class AgentService extends BaseService {
  getAgentVersion(): string {
    return ROC_CLI_VERSION
  }

  getPlatform(): string {
    return os.platform()
  }

  getHostname(): string {
    return os.hostname()
  }

  getArch(): string {
    return os.arch()
  }
}
