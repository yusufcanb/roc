import {RocCommand} from '../command'
import {Flags} from "@oclif/core";

export default class TaskForceGetRobotCommand extends RocCommand {
  static description = 'Get robot package of task force'

  static examples = [
    `$ roc task-force get-robot [task-force-id]
[OK] Robot package downloaded.
`,
  ]

  static flags = {
    output: Flags.string({char: "o", description: "Output path of downloaded file", required: false})
  }

  static args = [{name: 'id', required: true}]

  async run(): Promise<void> {
    const {args, flags} = await this.parse(TaskForceGetRobotCommand)
    const taskForce = await this.api.taskForce.getTaskForcesById(args.id)

    await this.api.taskForce.downloadTaskForceRobot(taskForce, flags.output ?? taskForce.robot.split("/").pop() as string)
    this.log("Done")
  }
}
