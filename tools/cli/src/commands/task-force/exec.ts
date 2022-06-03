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

export default class TaskForceExecuteCommand extends RocCommand {
  static description = 'Execute task force'

  static examples = [
    `$ roc task-force exec [task-force-id] --agent agent-1 --env development
[OK] Job queued with agent agent-1 and environment development
`,
  ]

  static flags = {
    env: Flags.string(
      {char: 'e', description: 'Environment identifier', required: true},
    ),
    agent: Flags.string(
      {char: 'a', description: 'Agent identifier', required: true},
    ),
  }

  static args = [{name: 'id', required: true}]

  async run(): Promise<void> {
    const {args, flags} = await this.parse(TaskForceExecuteCommand)
    const response = await this.api.taskForce.executeTaskForce(args.id, flags.agent, flags.env)

    if (response === 200) {
      this.log(`[OK] Job queued with agent ${flags.agent} and environment ${flags.env}`)
    } else {
      this.log('[FAIL] Command failed')
    }
  }
}
