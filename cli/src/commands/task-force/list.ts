import {Command, Flags} from '@oclif/core'

import * as api from "./api"

export default class TaskForceListCommand extends Command {
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

    const taskForces = await api.getTaskForcesByProject(flags.project)
    console.table(taskForces)
  }

}
