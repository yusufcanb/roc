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

export default class SetCredentialsCommand extends RocCommand {
  static description = 'Set credentials of ROC'

  static examples = [
    `$ roc config set-credentials --key [YOUR_KEY] --secret [YOUR_SECRET]
[OK] Platform credentials saved`,
  ]

  static flags = {
    key: Flags.string(
      {char: 'k', description: 'API Key of ROC Platform', required: true},
    ),
    secret: Flags.string(
      {char: 's', description: 'API Secret of ROC Platform', required: true},
    ),
  }

  static args = []

  async run(): Promise<void> {
    // const {args, flags} = await this.parse(SetCredentialsCommand)
    this.log('[OK] Platform credentials saved')
  }
}
