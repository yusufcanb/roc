import {Command, Flags} from '@oclif/core'

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
  }

  static args = []

  async run(): Promise<void> {
    const {args, flags} = await this.parse(AgentCreateCommand)
    this.log(`[OK] Agent ${flags.name} created`)
  }


}
