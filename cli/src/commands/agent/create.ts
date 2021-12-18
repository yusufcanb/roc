import {Command, Flags} from '@oclif/core'

import * as api from "./api";

export default class AgentCreateCommand extends Command {
  static description = 'Create new agent for specific project'

  static examples = [
    `$ roc agent create -n z3-subnet-1 -p default
[OK] Agent z3-subnet-1 created
`,
  ]

  static flags = {
    project: Flags.string(
      {char: 'p', description: 'Project identifier', required: true}
    ),
    name: Flags.string(
      {char: 'n', description: 'Name of the agent', required: true}
    ),
    os: Flags.string(
      {char: 'o', description: 'Name of the agent', required: false}
    ),
  }

  static args = []

  async run(): Promise<void> {
    const {args, flags} = await this.parse(AgentCreateCommand)

    if (await api.createAgent(flags.project, flags.name, flags.os) === 201) {
      this.log(`[OK] Agent ${flags.name} created`)
    } else {
      this.log(`[FAIL] Agent creation failed`)
    }

  }


}
