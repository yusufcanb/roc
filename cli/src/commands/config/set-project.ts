import {RocCommand} from "../command";

export default class SetProjectCommand extends RocCommand {
  static description = 'Set default project for Robot Operation Center CLI'

  static examples = [
    `$ roc config set-project default-project
[OK] default project set`,
  ]

  static flags = {}

  static args = [{name: 'project', description: 'Identifier of project', required: true}]

  async run(): Promise<void> {
    const {args, flags} = await this.parse(SetProjectCommand)
    this.roc.setDefaultProject(args.project)
    this.log(`[OK] ${args.project} set`)
  }
}
