import {Command, Flags} from '@oclif/core'

export default class EnvironmentCreateCommand extends Command {
  static description = 'Create new environment for specific project'

  static examples = [
    `$ roc environment create -p default -n development -v variables.yaml
[OK] Environment development created
`,
  ]

  static flags = {
    project: Flags.string(
      {char: 'p', description: 'Project identifier', required: true}
    ),
    name: Flags.string(
      {char: 'n', description: 'Name of the environment', required: true}
    ),
    variables: Flags.string(
      {char: 'v', description: 'Variables file of the environment', required: true}
    ),
  }

  static args = []

  async run(): Promise<void> {
    const {args, flags} = await this.parse(EnvironmentCreateCommand)
    this.log(`[OK] Environment ${flags.name} created`)
  }


}
