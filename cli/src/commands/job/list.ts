import {Flags} from '@oclif/core'
import {RocCommand} from '../command'

export default class JobListCommand extends RocCommand {
  static description = 'List task forces by project'

  static examples = [
    `$ roc task-force list -p default
`,
  ]

  static flags = {
    project: Flags.string(
      {char: 'p', description: 'Project identifier', required: false},
    ),
  }

  static args = []

  async run(): Promise<void> {
    const {flags} = await this.parse(JobListCommand)
    const project = this.getProjectOrDefault(flags.project)

    const response = await this.api.job.getJobsByProject(project)
    const jobs: any = []
    for (const job of response.data) {
      jobs.push(
        {
          Id: job.id,
          Agent: job.agent.displayName,
          Environment: job.environment.name,
          'Task Force': job.taskForce.name,
          Status: job.status,
        },
      )
    }

    console.table(jobs)
  }
}
