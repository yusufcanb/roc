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

import {Flags} from '@oclif/core'
import {RocCommand} from '../command'

import fs from 'fs'
import tmp from 'tmp'
import path from 'path'
import archiver from 'archiver'

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
    directory: Flags.directory(
      {char: 'd', description: 'Robot root directory', required: true},
    ),
  }

  static args = []

  async run(): Promise<void> {
    const {flags} = await this.parse(TaskForceCreateCommand)
    const project = this.getProjectOrDefault(flags.project)

    const tempArchivePath = tmp.fileSync({prefix: 'robot-assembly', postfix: '.zip'})
    console.log(tempArchivePath.name)
    const output = fs.createWriteStream(tempArchivePath.name)
    const archive = archiver('zip', {
      zlib: {level: 9}, // Sets the compression level.
    })

    archive.pipe(output)
    archive.directory(flags.directory, false)
    await archive.finalize()

    try {
      const response = await this.api.taskForce.createTaskForce(project, flags.name)
      if (response.status >= 200 && response.status < 400) {
        this.log('[1] Creating entity')
        await this.api.taskForce.uploadRobotPackage(response.data.id, {
          fileName: path.basename(tempArchivePath.name),
          stream: fs.createReadStream(tempArchivePath.name),
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
