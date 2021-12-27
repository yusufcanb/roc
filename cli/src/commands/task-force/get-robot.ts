import {RocCommand} from '../command'

export default class TaskForceGetRobotCommand extends RocCommand {
  static description = 'Get robot package of task force'

  static examples = [
    `$ roc task-force get-robot [task-force-id]
[OK] Robot package downloaded.
`,
  ]

  static flags = {}

  static args = [{name: 'id', required: true}]

  async run(): Promise<void> {
    const {args} = await this.parse(TaskForceGetRobotCommand)

    throw new Error("Not implemented")
  }
}
