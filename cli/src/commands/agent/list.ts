import {Flags} from '@oclif/core'
import {RocCommand} from '../command'

export default class AgentListCommand extends RocCommand {
  static description = 'List agents by project'

  static examples = [
    `$ roc-ctl agent list -p default
`,
  ]

  static flags = {
    project: Flags.string(
      {char: 'p', description: 'Project identifier', required: false},
    ),
  }

  static args = []

  async run(): Promise<void> {
    const {flags} = await this.parse(AgentListCommand)
    let project

    if (flags.project === undefined) {
      try {
        project = this.roc.getDefaultProject()
        console.log('Using default project is ' + project)
      } catch {
        throw new Error('Project is not specified. Use -p option or specify a default project.')
      }
    } else {
      project = flags.project
    }

    try {
      const agents = await this.api.agent.getAgentsByProject(project)
      console.table(agents)
    } catch (error) {
      console.error(error)
    }
  }
}
