import {Command} from '@oclif/core'

export default class ProjectDeleteCommand extends Command {
  static description = 'Delete project by its identifier'

  static examples = [
    `$ roc project delete demo-project
[OK] Environment demo-project deleted
`,
  ]

  static flags = {}

  static args = [
    {name: 'id'},
  ]

  async run(): Promise<void> {
    const {args, flags} = await this.parse(ProjectDeleteCommand)
    this.log(`[OK] Project ${args.id} deleted`)
  }

}
