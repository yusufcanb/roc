import {RocCommand} from '../command'
import {JobModel} from "../../api/job";

export default class JobReportCommand extends RocCommand {
  static description = 'Open job report in default browser'

  static examples = [
    `$ roc job report [job-id]
`,
  ]

  static flags = {}

  static args = [
    {name: 'id'},
  ]

  async run(): Promise<void> {
    const {args} = await this.parse(JobReportCommand)
    const response = await this.api.job.getJobById(args.id)

    if (response.status == 200) {
      const job = new JobModel(response.data)
      if (job.reportAvailable()) {
        await this.api.job.getJobReportById(args.id)
        this.log("[OK] Job report opened on default browser")
      } else {
        this.log("[FAIL] Job report is not available now")
      }
    } else {
      this.log("[FAIL] Job not exists")
    }
  }
}
