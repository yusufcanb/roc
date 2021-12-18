import {Command, Flags} from '@oclif/core'

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
    this.log(`[OK] Environment list for project ${flags.project}`)

    const structDatas = [
      {id: 1, name: 'development', lastActive: Date.now()},
      {id: 2, name: 'production', lastActive: Date.now()},
    ];
    console.table(structDatas)
  }


}
