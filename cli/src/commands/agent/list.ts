import {Command, Flags} from '@oclif/core'

import * as api from "./api";

export default class AgentListCommand extends Command {
  static description = 'List agents by project'

  static examples = [
    `$ roc agent list -p default
`,
  ]

  static flags = {
    project: Flags.string(
      {char: 'p', description: 'Project identifier', required: true}
    ),
  }

  static args = []

  async run(): Promise<void> {
    const {args, flags} = await this.parse(AgentListCommand)

    const agents = await api.getAgentsByProject(flags.project)
    console.table(agents)
  }


}
