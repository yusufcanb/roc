import {Command} from '@oclif/core'

export default class TaskForceDeleteCommand extends Command {
  static description = 'Delete task force by its identifier'

  static examples = [
    `$ roc task-force delete form-processor
[OK] Task force form-processor deleted
`,
  ]

  static flags = {}

  static args = [
    {name: 'id'},
  ]

  async run(): Promise<void> {
    const {args, flags} = await this.parse(TaskForceDeleteCommand)
    this.log(`[OK] Task force ${args.id} deleted`)
  }

}
