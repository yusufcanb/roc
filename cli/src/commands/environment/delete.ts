import {RocCommand} from '../command'

export default class EnvironmentDeleteCommand extends RocCommand {
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

    try {
      await this.api.environment.deleteEnvironment(args.id)
    } catch (error: any) {
      this.log('[FAIL] ' + error.message)
    }
  }
}
