import {Command, Flags} from '@oclif/core'

export default class TaskForceExecuteCommand extends Command {
  static description = 'Execute task force'

  static examples = [
    `$ roc task-force exec [task-force-id] --agent agent-1 --env development
[OK] Job queued with agent agent-1 and environment development
`,
  ]

  static flags = {
    env: Flags.string(
      {char: 'e', description: 'Environment identifier', required: true}
    ),
    agent: Flags.string(
      {char: 'a', description: 'Agent identifier', required: true}
    ),
  }

  static args = [{name: "id", required: true}]

  async run(): Promise<void> {
    const {args, flags} = await this.parse(TaskForceExecuteCommand)
    this.log(`[OK] Job queued with agent ${flags.agent} and environment ${flags.env}`)
  }


}
