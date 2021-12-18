import {Command, Flags} from '@oclif/core'

import * as api from "./api"

export default class EnvironmentListCommand extends Command {
  static description = 'List environments by project'

  static examples = [
    `$ roc environment list -p default

`,
  ]

  static flags = {
    project: Flags.string(
      {char: 'p', description: 'Project identifier', required: true}
    ),
  }

  static args = []

  async run(): Promise<void> {
    const {args, flags} = await this.parse(EnvironmentListCommand)

    const environments = await api.getEnvironmentsByProject(flags.project)

    console.table(environments)
  }


}
