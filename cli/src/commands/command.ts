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

import {Command} from '@oclif/core'

import {ROC} from '../roc'
import {ROCApi} from '../api'
import {Config} from '@oclif/core/lib/config'

export abstract class RocCommand extends Command {
  public roc: ROC
  public api: ROCApi

  constructor(argv: string[], config: Config) {
    super(argv, config)
    this.roc = new ROC()
    this.api = new ROCApi(this.roc.getPlatformUrl())
  }

  getProjectOrDefault(projectName: string | null | undefined): string {
    let project

    if (projectName === undefined) {
      try {
        project = this.roc.getDefaultProject()
        this.log('Using default project is ' + project)
      } catch {
        throw new Error('Project is not specified. Use -p option or specify a default project.')
      }
    } else {
      project = projectName
    }

    return project as string
  }
}
