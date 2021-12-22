import {RocCommand} from '../command'

export default class TaskForceDeleteCommand extends RocCommand {
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
    const {args} = await this.parse(TaskForceDeleteCommand)

    try {
      const response = await this.api.taskForce.deleteTaskForceById(args.id)

      if (response.status > 200 || response.status < 400) {
        this.log(`[OK] Task force ${args.id} deleted`)
      } else {
        this.log(`[FAIL] Task force ${args.id} cannot be deleted. Return code is ${response.status}`)
      }
    } catch (error: any) {
      console.error(error)
      this.log(`[FAIL] Task force ${args.id} cannot be deleted. Return code is ${error.toString()}`)
    }
  }
}
