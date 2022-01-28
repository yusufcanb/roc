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

import fs from 'fs'
import path from 'path'
import os from 'os'

export class ROC {
  private static CONFIG_PATH = path.join(os.homedir(), '.roc.json')

  private config: any = {
    rocUrl: null,
    defaultProject: null,
  }

  constructor() {
    if (!fs.existsSync(ROC.CONFIG_PATH)) {
      console.debug('Config file does not exists')
      fs.writeFileSync(ROC.CONFIG_PATH, JSON.stringify(this.config))
      this.persistConfig()
    } else {
      this.syncConfig()
    }
  }

  syncConfig(): void {
    try {
      const content = fs.readFileSync(ROC.CONFIG_PATH)
      const obj = JSON.parse(content.toString())
      this.config.rocUrl = obj.rocUrl
      this.config.defaultProject = obj.defaultProject
    } catch (error) {
      console.error(error)
      this.config = {
        rocUrl: null,
        defaultProject: null,
      }
    }
  }

  persistConfig(): void {
    fs.writeFileSync(ROC.CONFIG_PATH, JSON.stringify(this.config))
  }

  getPlatformUrl(): string {
    if (this.config.rocUrl === null) {
      throw new Error('Host is not configured')
    } else {
      return this.config.rocUrl
    }
  }

  setPlatformUrl(value: string): void {
    this.config.rocUrl = value
    this.persistConfig()
  }

  getDefaultProject(): string {
    console.log(this.config.defaultProject)
    if (this.config.rocUrl === null || this.config.rocUrl === '') {
      throw new Error('Default project is not configured')
    } else {
      return this.config.defaultProject
    }
  }

  setDefaultProject(value: string): void {
    this.config.defaultProject = Number(value)
    this.persistConfig()
  }
}
