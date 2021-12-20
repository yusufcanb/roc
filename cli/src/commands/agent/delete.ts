import {RocCommand} from "../command";

export default class AgentDeleteCommand extends RocCommand {
  static description = 'Delete agent by its identifier'

  static examples = [
    `$ roc agent delete agent-1
[OK] agent-1 deleted
`,
  ]

  static flags = {}

  static args = [
    {name: 'id'},
  ]

  async run(): Promise<void> {
    const {args, flags} = await this.parse(AgentDeleteCommand)
    this.log(`[OK] Agent ${args.id} deleted`)
  }

}