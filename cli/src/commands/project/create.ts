import {Flags} from '@oclif/core'
import {RocCommand} from "../command";


export default class ProjectCreateCommand extends RocCommand {
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

    if (await this.api.project.createProject(flags.name) === 200) {
      this.log(`[OK] ${flags.name} created`)
    } else {
      this.log(`[ERROR] Project creation failed`)
    }
  }

}
