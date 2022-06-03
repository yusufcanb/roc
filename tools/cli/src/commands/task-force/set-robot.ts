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
import path from 'path'
import fs from 'fs'
import fileType from 'file-type'

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

    if (flags.repository) {
      await this.api.taskForce.updateTaskForceById(args.id, {robot: flags.repository})
      this.log('[OK] Task force robot updated')
    } else if (flags.file) {
      try {
        const mimeType = await fileType.fromFile(flags.file)
        if (mimeType?.ext !== 'zip' && mimeType?.mime !== 'application/zip') {
          this.log('[ERROR] Invalid robot package specified')
        }

        await this.api.taskForce.uploadRobotPackage(args.id, {
          fileName: path.basename(flags.file),
          stream: fs.createReadStream(flags.file),
        })
        this.log('[OK] Task force package uploaded')
      } catch (error: any) {
        this.log('[ERROR] ' + error.toString())
      }
    }
  }
}
