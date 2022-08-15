import {RawData} from 'ws'

export class RocEvent {
  static EVENT_SEPERATOR = '::'
  static EVENT_TOPIC_INDEX = 0
  static EVENT_PAYLOAD_INDEX = 1

  static JOB_CREATED = 'job.created'
  static AGENT_PING = 'agent.ping'

  readonly raw: RawData

  constructor(wsMessage: RawData) {
    this.raw = wsMessage
  }

  getTopic(): string {
    return this.raw.toString().split('::')[0]
  }

  getPayload(): any {
    return this.raw.toString().split('::')[1]
  }
}
