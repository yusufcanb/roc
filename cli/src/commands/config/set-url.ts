import {RocCommand} from '../command'

export default class SetUrlCommand extends RocCommand {
  static description = 'Set configurations for ROC'

  static examples = [
    `$ roc config set-url https://roc.platform
ROC platform set to https://roc.platform`,
  ]

  static flags = {}

  static args = [{name: 'url', description: 'URL of the ROC Platform', required: true}]

  async run(): Promise<void> {
    const {args} = await this.parse(SetUrlCommand)
    this.roc.setPlatformUrl(args.url)
    this.log('[OK] ROC platform configured')
  }
}
