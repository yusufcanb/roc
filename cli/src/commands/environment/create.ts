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

import * as fs from 'fs'

export default class EnvironmentCreateCommand extends RocCommand {
  static description = 'Create new environment for specific project'

  static examples = [
    `$ roc environment create -p default -n development -v variables.yaml
[OK] Environment development created
`,
  ]

  static flags = {
    project: Flags.string(
      {char: 'p', description: 'Project identifier', required: false},
    ),
    name: Flags.string(
      {char: 'n', description: 'Name of the environment', required: true},
    ),
    description: Flags.string(
      {char: 'd', description: 'Description of the environment', required: false},
    ),
    variables: Flags.string(
      {char: 'v', description: 'Variables file of the environment', required: true},
    ),
  }

  static args = []

  async getVariablesFromFile(path: string): Promise<string> {
    const content = fs.readFileSync(path, 'utf-8')
    return content
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(EnvironmentCreateCommand)

    let project

    if (flags.project === undefined) {
      try {
        project = this.roc.getDefaultProject()
      } catch {
        throw new Error('Project is not specified. Use -p option or specify a default project.')
      }
    } else {
      project = flags.project
    }

    const dto: { code: string; name: string; description: string } = {
      name: flags.name,
      description: flags.description ?? '',
      code: await this.getVariablesFromFile(flags.variables),
    }

    const rc = await this.api.environment.createEnvironment(project, dto)
    if (rc === 201) {
      this.log(`[OK] Environment ${flags.name} created`)
    } else {
      this.log('[FAIL] Operation failed')
    }
  }
}
