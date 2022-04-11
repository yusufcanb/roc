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

export default class AgentCreateCommand extends RocCommand {
  static description = 'Create new agent for specific project'

  static examples = [
    `$ roc-ctl agent create -n z3-subnet-1 -p default
[OK] Agent z3-subnet-1 created
`,
  ]

  static flags = {
    project: Flags.string(
      {char: 'p', description: 'Project identifier', required: false},
    ),
    name: Flags.string(
      {char: 'n', description: 'Name of the agent', required: true},
    ),
    os: Flags.string(
      {char: 'o', description: 'Name of the agent', required: false},
    ),
  }

  static args = []

  async run(): Promise<void> {
    const {flags} = await this.parse(AgentCreateCommand)
    let project

    console.log('flags.project is ' + flags.project)
    if (flags.project === undefined) {
      try {
        project = this.roc.getDefaultProject()
        console.log('Default project is ' + project)
      } catch {
        throw new Error('Project is not specified. Use -p option or specify a default project.')
      }
    } else {
      project = flags.project
    }

    try {
      await this.api.agent.createAgent(project, flags.name, flags.os)
    } catch (error) {
      console.error(error)
      this.log('[FAIL] Agent creation failed')
    }
  }
}
