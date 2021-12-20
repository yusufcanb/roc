import {API} from "./base";
import {TaskForceAPI} from "./task-force";
import {ProjectAPI} from "./project";
import {AgentAPI} from "./agent";
import {EnvironmentApi} from "./environment";


export class ROCApi extends API {

  public project: ProjectAPI
  public agent: AgentAPI
  public environment: EnvironmentApi
  public taskForce: TaskForceAPI

  constructor(baseUrl: string) {
    super(baseUrl);
    this.project = new ProjectAPI(baseUrl)
    this.agent = new AgentAPI(baseUrl)
    this.environment = new EnvironmentApi(baseUrl)
    this.taskForce = new TaskForceAPI(baseUrl)
  }

}
