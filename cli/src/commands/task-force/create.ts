import {Command, Flags} from '@oclif/core'

export default class TaskForceCreateCommand extends Command {
  static description = 'Create new task force for specific project'

  static examples = [
    `$ roc task-force create -n api-health-checker -p default
[OK] Task Force api-health-checker created
`,
  ]

  static flags = {
    project: Flags.string(
      {char: 'p', description: 'Project identifier', required: true}
    ),
    name: Flags.string(
      {char: 'n', description: 'Name of the task force', required: true}
    ),
  }

  static args = []

  async run(): Promise<void> {
    const {args, flags} = await this.parse(TaskForceCreateCommand)
    this.log(`[OK] Task force ${flags.name} created`)
  }


}
