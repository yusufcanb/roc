import {Command, Flags} from '@oclif/core'

export default class TaskForceListCommand extends Command {
  static description = 'List task forces by project'

  static examples = [
    `$ roc task-force list -p default

`,
  ]

  static flags = {
    project: Flags.string(
      {char: 'p', description: 'Project identifier', required: true}
    ),
  }

  static args = []

  async run(): Promise<void> {
    const {args, flags} = await this.parse(TaskForceListCommand)
    this.log(`[OK] Task force list for project ${flags.project}`)

    const structDatas = [
      {id: 1, name: 'api-health-checker', type: "repository", url: "https://github.com/yusufcanb/robot-template"},
      {id: 2, name: 'form-processor', type: "repository", url: "https://github.com/yusufcanb/form-processor"},
    ];
    console.table(structDatas)
  }


}
