import {Flags} from '@oclif/core'
import {RocCommand} from "../command";

export default class TaskForceListCommand extends RocCommand {
  static description = 'List task forces by project'

  static examples = [
    `$ roc task-force list -p default
`,
  ]

  static flags = {
    project: Flags.string(
      {char: 'p', description: 'Project identifier', required: true}
    ),
  }

  static args = []


  async run(): Promise<void> {
    const {args, flags} = await this.parse(TaskForceListCommand)
    let project;

    if (flags.project === undefined) {
      try {
        project = this.roc.getDefaultProject()
        console.log("Using default project is " + project)
      } catch (e) {
        throw new Error("Project is not specified. Use -p option or specify a default project.")
      }
    } else {
      project = flags.project
    }

    const taskForces = await this.api.taskForce.getTaskForcesByProject(project)
    console.table(taskForces)
  }

}
