import {Command} from '@oclif/core'
import {CLIError} from "@oclif/core/lib/errors";

export default class EnvironmentVariablesCommand extends Command {
  static description = 'Print variables of the environment'

  static examples = [
    `$ roc environment variables [env-id]
`,
  ]

  static flags = {}

  static args = [{name: "id", required: true}]

  async run(): Promise<void> {
    const {args, flags} = await this.parse(EnvironmentVariablesCommand)

    throw new CLIError("Not implemented yet")
  }

}
