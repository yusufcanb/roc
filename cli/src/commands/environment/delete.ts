import {Command} from '@oclif/core'

export default class EnvironmentDeleteCommand extends Command {
  static description = 'Delete environment by its identifier'

  static examples = [
    `$ roc environment delete development
[OK] Environment development deleted
`,
  ]

  static flags = {}

  static args = [
    {name: 'id'},
  ]

  async run(): Promise<void> {
    const {args, flags} = await this.parse(EnvironmentDeleteCommand)
    this.log(`[OK] Environment ${args.id} deleted`)
  }

}
