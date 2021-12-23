import {RocCommand} from '../command'

export default class EnvironmentVariablesCommand extends RocCommand {
  static description = 'Print variables of the environment'

  static examples = [
    `$ roc environment variables [env-id]
`,
  ]

  static flags = {}

  static args = [{name: 'id', required: true}]

  async run(): Promise<void> {
    const {args} = await this.parse(EnvironmentVariablesCommand)
    const variables = await this.api.environment.getEnvironmentVariables(args.id)
    console.log("[OK] Printing variables.yaml")
    console.log(variables)
  }
}
