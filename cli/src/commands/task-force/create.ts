import {Flags} from '@oclif/core'
import {RocCommand} from "../command";

export default class TaskForceCreateCommand extends RocCommand {
  static description = 'Create new task force for specific project'

  static examples = [
    `$ roc task-force create -n api-health-checker -p default
[OK] Task Force api-health-checker created
`,
  ]

  static flags = {
    project: Flags.string(
      {char: 'p', description: 'Project identifier', required: false}
    ),
    name: Flags.string(
      {char: 'n', description: 'Name of the task force', required: true}
    ),
    package: Flags.string(
      {char: 'p', description: 'Robot package', required: true}
    ),
  }

  static args = []

  async run(): Promise<void> {
    const {args, flags} = await this.parse(TaskForceCreateCommand)
    const project = this.getProjectOrDefault(flags.project)

    const response = await this.api.taskForce.createTaskForce(project, flags.name)

    this.log(`[OK] Task force ${flags.name} created`)
  }

}
