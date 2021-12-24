import {Flags} from '@oclif/core'
import {RocCommand} from '../command'

import fs from 'fs'

export default class TaskForceCreateCommand extends RocCommand {
  static description = 'Create new task force for specific project'

  static examples = [
    `$ roc task-force create -n api-health-checker -p default
[OK] Task Force api-health-checker created
`,
  ]

  static flags = {
    project: Flags.string(
      {char: 'p', description: 'Project identifier', required: false},
    ),
    name: Flags.string(
      {char: 'n', description: 'Name of the task force', required: true},
    ),
    file: Flags.string(
      {char: 'f', description: 'Robot package file', required: true},
    ),
  }

  static args = []

  async run(): Promise<void> {
    const {flags} = await this.parse(TaskForceCreateCommand)
    const project = this.getProjectOrDefault(flags.project)

    try {
      const response = await this.api.taskForce.createTaskForce(project, flags.name)
      if (response.status >= 200 && response.status < 400) {
        this.log('[1] Creating entity')
        await this.api.taskForce.uploadRobotPackage(response.data.id, {
          fileName: 'robot.zip',
          stream: fs.createReadStream(flags.file),
        })
        this.log('[2] Uploading package')
        this.log(`[OK] Task force ${flags.name} created`)
      } else {
        this.log(`[FAIL] Task force cannot be created. ${JSON.stringify(response.data)}`)
      }
    } catch (error: any) {
      this.log('[ERROR] ' + error.toString())
    }
  }
}
