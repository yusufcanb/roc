import {WebSocket, RawData} from 'ws'
import {RocCommand} from '../command'
import {adjectives, animals, uniqueNamesGenerator} from 'unique-names-generator'

export default class AgentStartCommand extends RocCommand {
  static description = 'Starts a process as an agent'

  static examples = [
    `$ roc-ctl agent start
[OK] Agent host-name is starting
`,
  ]

  static flags = {}

  static args = []

  async run(): Promise<void> {
    return new Promise(
      // eslint-disable-next-line no-async-promise-executor
      async () => {
        this.log('[OK] Provisioning agent...')
        const shortName = uniqueNamesGenerator({
          dictionaries: [adjectives, animals],
          length: 2,
        })
        try {
          const agent: any = await this.api.agent.createAgent(shortName)
          this.log(`[OK] Provisioned as ${shortName}...`)
          setInterval(async () => {
            try {
              await this.api.agent.heartBeat(agent.id)
            } catch (error: any) {
              this.log(error.message)
            }
          }, 1000)
        } catch {
          console.error('[ERROR] Error connecting platform.')
          // eslint-disable-next-line no-process-exit,unicorn/no-process-exit
          process.exit(-1)
        }

        this.log('[OK] Connecting to operation center...')
        const url = new URL(this.api.baseUrl)
        const ws = new WebSocket(`ws://${url.hostname}:${url.port}/ws`)

        ws.on('open', () => {
          this.log('[OK] Connection established...')
        })

        ws.on('message', (data: RawData) => {
          const platformEvent: string = data.toString().split('::')[0]
          if (platformEvent === 'job.created') {
            this.log('[OK] Received new job: %s', data)
          }

          ws.resume()
        })
      },
    )
  }
}
