import {RocCommand} from '../command'
import {Flags} from "@oclif/core";
import fs from "fs";

export default class TaskForceSetRobotCommand extends RocCommand {
  static description = 'Set robot package of task force. It can be a local file or remote git repository url.'

  static examples = [
    `$ roc task-force set-robot [task-force-id] -f example-robot.zip
[OK] Robot package uploaded.
`, `$ roc task-force set-robot [task-force-id] -r https://github.com/yusufcanb/robot-template
[OK] Robot package set to repository https://github.com/yusufcanb/robot-template.
`,
  ]

  static flags = {
    repository: Flags.string(
      {char: 'r', description: 'Robot repository url', required: false},
    ),
    file: Flags.string(
      {char: 'f', description: 'Local robot package file', required: false},
    ),
  }

  static args = [{name: 'id', required: true}]

  async run(): Promise<void> {
    const {args, flags} = await this.parse(TaskForceSetRobotCommand)
    console.log(flags)

    if (flags.repository) {
      await this.api.taskForce.updateTaskForceById(args.id, {robot: flags.repository})
      this.log("[OK] Task force robot updated")
    } else if (flags.file) {
      try {
        await this.api.taskForce.uploadRobotPackage(args.id, {
          fileName: 'robot.zip',
          stream: fs.createReadStream(flags.file),
        })
        this.log("[OK] Task force package uploaded")
      } catch (error: any) {
        this.log('[ERROR] ' + error.toString())
      }
    }
  }
}
