import {Command, Flags} from '@oclif/core'

import * as api from "./api"

export default class ProjectListCommand extends Command {
  static description = 'List projects'

  static examples = [
    `$ roc project list

`,
  ]

  static flags = {}

  static args = []

  async run(): Promise<void> {
    const projects = await api.getProjects()
    console.table(projects)
  }


}
