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

export default class ProjectCreateCommand extends RocCommand {
  static description = 'Create new project'

  static examples = [
    `$ roc project create -n New Project
[OK] New Project created
`,
  ]

  static flags = {
    name: Flags.string(
      {char: 'n', description: 'Name of project', required: true},
    ),
  }

  static args = []

  async run(): Promise<void> {
    const {flags} = await this.parse(ProjectCreateCommand)

    if (await this.api.project.createProject(flags.name) === 200) {
      this.log(`[OK] ${flags.name} created`)
    } else {
      this.log('[ERROR] Project creation failed')
    }
  }
}
