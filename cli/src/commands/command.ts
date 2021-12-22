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
        console.log('Using default project is ' + project)
      } catch {
        throw new Error('Project is not specified. Use -p option or specify a default project.')
      }
    } else {
      project = projectName
    }

    return project
  }
}
