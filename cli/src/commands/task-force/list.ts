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

    const taskForces = await this.api.taskForce.getTaskForcesByProject(flags.project)
    console.table(taskForces)
  }

}
