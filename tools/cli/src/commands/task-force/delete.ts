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

export default class TaskForceDeleteCommand extends RocCommand {
  static description = 'Delete task force by its identifier'

  static examples = [
    `$ roc task-force delete form-processor
[OK] Task force form-processor deleted
`,
  ]

  static flags = {}

  static args = [
    {name: 'id'},
  ]

  async run(): Promise<void> {
    const {args} = await this.parse(TaskForceDeleteCommand)

    try {
      const response = await this.api.taskForce.deleteTaskForceById(args.id)

      if (response.status > 200 || response.status < 400) {
        this.log(`[OK] Task force ${args.id} deleted`)
      } else {
        this.log(`[FAIL] Task force ${args.id} cannot be deleted. Return code is ${response.status}`)
      }
    } catch (error: any) {
      console.error(error)
      this.log(`[FAIL] Task force ${args.id} cannot be deleted. Return code is ${error.toString()}`)
    }
  }
}
