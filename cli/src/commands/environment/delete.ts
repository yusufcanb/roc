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

export default class EnvironmentDeleteCommand extends RocCommand {
  static description = 'Delete environment by its identifier'

  static examples = [
    `$ roc environment delete development
[OK] Environment development deleted
`,
  ]

  static flags = {}

  static args = [
    {name: 'id'},
  ]

  async run(): Promise<void> {
    const {args} = await this.parse(EnvironmentDeleteCommand)

    try {
      await this.api.environment.deleteEnvironment(args.id)
      this.log('[OK] environment deleted')
    } catch (error: any) {
      this.log('[ERR] ' + error.message)
    }
  }
}
