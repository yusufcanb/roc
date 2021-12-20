import {RocCommand} from "../command";

export default class GetUrlCommand extends RocCommand {
  static description = 'Set configurations for ROC'

  static examples = [
    `$ roc config get-url
[OK] http://example.roc-service.local`,
  ]

  async run(): Promise<void> {
    this.log("[OK] " + this.roc.getPlatformUrl())
  }
}
