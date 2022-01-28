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

export default class EnvironmentVariablesCommand extends RocCommand {
  static description = 'Print variables of the environment'

  static examples = [
    `$ roc environment variables [env-id]
`,
  ]

  static flags = {}

  static args = [{name: 'id', required: true}]

  async run(): Promise<void> {
    const {args} = await this.parse(EnvironmentVariablesCommand)
    const variables = await this.api.environment.getEnvironmentVariables(args.id)
    console.log('[OK] Printing variables.yaml')
    console.log(variables)
  }
}
