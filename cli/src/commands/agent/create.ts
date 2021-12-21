import {Flags} from '@oclif/core'
import {RocCommand} from "../command";


export default class AgentCreateCommand extends RocCommand {
  static description = 'Create new agent for specific project'

  static examples = [
    `$ roc-ctl agent create -n z3-subnet-1 -p default
[OK] Agent z3-subnet-1 created
`,
  ]

  static flags = {
    project: Flags.string(
      {char: 'p', description: 'Project identifier', required: false}
    ),
    name: Flags.string(
      {char: 'n', description: 'Name of the agent', required: true}
    ),
    os: Flags.string(
      {char: 'o', description: 'Name of the agent', required: false}
    ),
  }

  static args = []

  async run(): Promise<void> {
    const {args, flags} = await this.parse(AgentCreateCommand)
    let project;

    console.log("flags.project is " + flags.project)
    if (flags.project === undefined) {
      try {
        project = this.roc.getDefaultProject()
        console.log("Default project is " + project)
      } catch (e) {
        throw new Error("Project is not specified. Use -p option or specify a default project.")
      }
    } else {
      project = flags.project
    }

    try {
      await this.api.agent.createAgent(project, flags.name, flags.os)
    } catch (e) {
      console.error(e)
      this.log(`[FAIL] Agent creation failed`)
    }

  }

}
