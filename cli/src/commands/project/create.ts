import {Command, Flags} from '@oclif/core'

import * as api from "./api"

export default class ProjectCreateCommand extends Command {
  static description = 'Create new project'

  static examples = [
    `$ roc project create -n New Project
[OK] New Project created
`,
  ]

  static flags = {
    name: Flags.string(
      {char: 'n', description: 'Name of project', required: true}
    ),
  }

  static args = []

  async run(): Promise<void> {
    const {args, flags} = await this.parse(ProjectCreateCommand)

    if (await api.createProject(flags.name) === 200) {
      this.log(`[OK] ${flags.name} created`)
    } else {
      this.log(`[ERROR] Project creation failed`)
    }
  }

}
