import {RocCommand} from "../command"

export default class ProjectListCommand extends RocCommand {
  static description = 'List projects'

  static examples = [
    `$ roc project list
`,
  ]

  static flags = {}

  static args = []

  async run(): Promise<void> {
    const projects = await this.api.project.getProjects()
    console.table(projects)
  }

}
