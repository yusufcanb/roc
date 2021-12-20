import {RocCommand} from "../command";

export default class GetProjectCommand extends RocCommand {
  static description = 'Set configurations for ROC'

  static examples = [
    `$ roc config get-project
[OK] default-project`,
  ]

  async run(): Promise<void> {
    this.log("[OK] " + this.roc.getDefaultProject())
  }
}
