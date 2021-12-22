import {Flags} from '@oclif/core'
import {RocCommand} from '../command'

export default class SetCredentialsCommand extends RocCommand {
  static description = 'Set credentials of ROC'

  static examples = [
    `$ roc config set-credentials --key [YOUR_KEY] --secret [YOUR_SECRET]
[OK] Platform credentials saved`,
  ]

  static flags = {
    key: Flags.string(
      {char: 'k', description: 'API Key of ROC Platform', required: true},
    ),
    secret: Flags.string(
      {char: 's', description: 'API Secret of ROC Platform', required: true},
    ),
  }

  static args = []

  async run(): Promise<void> {
    const {args, flags} = await this.parse(SetCredentialsCommand)
    this.log('[OK] Platform credentials saved')
  }
}
