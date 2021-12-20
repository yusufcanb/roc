import {Flags} from '@oclif/core'
import {RocCommand} from "../command";

import * as fs from "fs"

export default class EnvironmentCreateCommand extends RocCommand {
  static description = 'Create new environment for specific project'

  static examples = [
    `$ roc environment create -p default -n development -v variables.yaml
[OK] Environment development created
`,
  ]

  static flags = {
    project: Flags.string(
      {char: 'p', description: 'Project identifier', required: false}
    ),
    name: Flags.string(
      {char: 'n', description: 'Name of the environment', required: true}
    ),
    description: Flags.string(
      {char: 'd', description: 'Description of the environment', required: false}
    ),
    variables: Flags.string(
      {char: 'v', description: 'Variables file of the environment', required: true}
    ),
  }

  static args = []

  async getVariablesFromFile(path: string) {
    const content = fs.readFileSync(path, "utf-8")
    return content
  }

  async run(): Promise<void> {
    const {args, flags} = await this.parse(EnvironmentCreateCommand)

    let project;

    if (flags.project === undefined) {
      try {
        project = this.roc.getDefaultProject()
      } catch (e) {
        throw new Error("Project is not specified. Use -p option or specify a default project.")
      }
    } else {
      project = flags.project
    }

    const dto: { code: string; name: string; description: string } = {
      name: flags.name,
      description: flags.description ?? "",
      code: await this.getVariablesFromFile(flags.variables)
    }

    const rc = await this.api.environment.createEnvironment(project, dto)
    if (rc == 201) {
      this.log(`[OK] Environment ${flags.name} created`)
    } else {
      this.log(`[FAIL] Operation failed`,)
    }

  }

}
