import {AgentService} from './agent'
import {JobService} from './job'
import {VariableService} from './variables'
import {DockerService} from './docker'

export default {
  agent: new AgentService(),
  job: new JobService(),
  variables: new VariableService(),
  docker: new DockerService(),
}
