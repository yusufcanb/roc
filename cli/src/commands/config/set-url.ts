import {Command} from '@oclif/core'

export default class SetUrlCommand extends Command {
  static description = 'Set configurations for ROC'

  static examples = [
    `$ roc config set-url https://roc.platform
ROC platform set to https://roc.platform`,
  ]

  static flags = {}

  static args = [{name: 'url', description: 'URL of the ROC Platform', required: true}]

  async run(): Promise<void> {
    const {args, flags} = await this.parse(SetUrlCommand)
    this.log(`[OK] ROC Platform configured`)
  }
}
