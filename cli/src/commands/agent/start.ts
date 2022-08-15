import {RawData, WebSocket} from 'ws'
import {adjectives, animals, uniqueNamesGenerator} from 'unique-names-generator'

import {RocCommand} from '../command'
import {RocEvent} from '../../event'

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
          const agent: any = await this.api.agent.createAgent({
            version: this.service.agent.getAgentVersion(),
            name: shortName,
            dockerVersion: await this.service.docker.getDockerVersion(),
            hostName: this.service.agent.getPlatform(),
            platform: this.service.agent.getPlatform(),
            arch: this.service.agent.getArch(),
          })

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
          const event = new RocEvent(data)

          if (event.getTopic() === RocEvent.JOB_CREATED) {
            this.log('[OK] Received new job: %s', data)
            this.service.job.executeJobByJobId(event.getPayload())
            .then((_: string) => null)
            .catch((error: Error) => console.error(error.message))
          }

          ws.resume()
        })
      },
    )
  }
}
