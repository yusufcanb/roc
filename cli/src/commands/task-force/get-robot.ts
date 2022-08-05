/*
 *   Copyright (c) 2021-2022 Yusuf Can Bayrak <yusufcanbayrak@gmail.com>
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 *   Contributors:
 *   Yusuf Can Bayrak - initial implementation and documentation.
 *
 */

import {RocCommand} from '../command'
import {Flags} from '@oclif/core'

export default class TaskForceGetRobotCommand extends RocCommand {
  static description = 'Get robot package of task force'

  static examples = [
    `$ roc task-force get-robot [task-force-id]
[OK] Robot package downloaded.
`,
  ]

  static flags = {
    output: Flags.string({char: 'o', description: 'Output path of downloaded file', required: false}),
  }

  static args = [{name: 'id', required: true}]

  async run(): Promise<void> {
    const {args, flags} = await this.parse(TaskForceGetRobotCommand)
    const taskForce = await this.api.taskForce.getTaskForcesById(args.id)

    await this.api.taskForce.downloadTaskForceRobot(taskForce, flags.output ?? taskForce.robot.split('/').pop() as string)
    this.log('[OK] Done')
  }
}
