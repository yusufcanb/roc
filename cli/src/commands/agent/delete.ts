import {RocCommand} from '../command'

export default class AgentDeleteCommand extends RocCommand {
  static description = 'Delete agent by its identifier'

  static examples = [
    `$ roc-ctl agent delete agent-1
[OK] agent-1 deleted
`,
  ]

  static flags = {}

  static args = [
    {name: 'id'},
  ]

  async run(): Promise<void> {
    const {args, flags} = await this.parse(AgentDeleteCommand)
    const rc = await this.api.agent.deleteAgent(args.id)
    if (rc > 200 && rc < 400) {
      this.log(`[OK] Agent ${args.id} deleted`)
    } else {
      this.log(`[FAIL] Delete failed. Return code is ${rc}`)
    }
  }
}
