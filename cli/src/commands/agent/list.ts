import {Command, Flags} from '@oclif/core'

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
    this.log(`[OK] Agent list for project ${flags.project}`)

    const structDatas = [
      {id: 1, name: 'subnet-vip-1', lastActive: Date.now()},
      {id: 2, name: 'subnet-vip-2', lastActive: Date.now()},
    ];
    console.table(structDatas)
  }


}
