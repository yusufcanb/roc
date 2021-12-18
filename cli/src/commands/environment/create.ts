import {Command, Flags} from '@oclif/core'

import * as fs from "fs"
import * as api from "./api"

export default class EnvironmentCreateCommand extends Command {
  static description = 'Create new environment for specific project'

  static examples = [
    `$ roc environment create -p default -n development -v variables.yaml
[OK] Environment development created
`,
  ]

  static flags = {
    project: Flags.string(
      {char: 'p', description: 'Project identifier', required: true}
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
    this.log(content)

    return content
  }

  async run(): Promise<void> {
    const {args, flags} = await this.parse(EnvironmentCreateCommand)

    const dto: { code: string; name: string; description: string } = {
      name: flags.name,
      description: flags.description ?? "",
      code: await this.getVariablesFromFile(flags.variables)
    }

    const rc = await api.createEnvironment(flags.project, dto)
    if (rc == 201) {
      this.log(`[OK] Environment ${flags.name} created`)
    } else {
      this.log(`[FAIL] Operation failed`)
    }

  }

}
