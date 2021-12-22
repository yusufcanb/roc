import {Flags} from '@oclif/core'
import {RocCommand} from '../command'

export default class EnvironmentListCommand extends RocCommand {
  static description = 'List environments by project'

  static examples = [
    `$ roc environment list -p default

`,
  ]

  static flags = {
    project: Flags.string(
      {char: 'p', description: 'Project identifier', required: false},
    ),
  }

  static args = []

  async run(): Promise<void> {
    const {flags} = await this.parse(EnvironmentListCommand)
    let project

    if (flags.project === undefined) {
      try {
        project = this.roc.getDefaultProject()
        console.log('Default project is ' + project)
      } catch {
        throw new Error('Project is not specified. Use -p option or specify a default project.')
      }
    } else {
      project = flags.project
    }

    const environments = await this.api.environment.getEnvironmentsByProject(project)

    console.table(environments)
  }
}
