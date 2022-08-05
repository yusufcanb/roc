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
  static description = 'Update an existing environment'

  static examples = [
    `$ roc environment update [ID] -v variables.yaml
[OK] Environment [ID] updated
`,
  ]

  static flags = {
    name: Flags.string(
      {char: 'n', description: 'Name of the environment', required: false},
    ),
    description: Flags.string(
      {char: 'd', description: 'Description of the environment', required: false},
    ),
    variables: Flags.string(
      {char: 'v', description: 'Variables file of the environment', required: false},
    ),
    tags: Flags.string(
      {char: 't', description: 'Tags of the environment', required: false},
    ),
  }

  static args = [{name: 'id', required: true}]

  async getVariablesFromFile(path: string): Promise<string> {
    return fs.readFileSync(path, 'utf-8')
  }

  async run(): Promise<void> {
    const {args, flags} = await this.parse(EnvironmentCreateCommand)

    const dto = {
      name: flags.name,
      description: flags.description,
      yaml: flags.variables !== undefined ? await this.getVariablesFromFile(flags.variables) : undefined,
      tags: flags.tags.split(','),
    }

    const response = await this.api.environment.updateEnvironmentById(args.id, dto)
    if (response.status === 200) {
      this.log(`[OK] Environment ${args.id} updated`)
    } else {
      this.log('[ERR] Operation failed')
    }
  }
}
