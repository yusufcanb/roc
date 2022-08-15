import {AgentService} from './agent'
import {JobService} from './job'
import {VariableService} from './variables'
import {DockerService} from './docker'

export default class ROCService {
  agent: AgentService;
  docker: DockerService;
  job: JobService;
  variable: VariableService;

  constructor(platformUrl: string) {
    this.agent = new AgentService(platformUrl)
    this.docker = new DockerService(platformUrl)
    this.job = new JobService(platformUrl)
    this.variable = new VariableService(platformUrl)
  }
}
