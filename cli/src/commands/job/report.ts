/*
 *   Copyright (c) 2021-2022 Yusuf Can Bayrak <yusufcanbayrak@gmail.com>
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 *   Contributors:
 *   Yusuf Can Bayrak - initial implementation and documentation.
 *
 */

import {RocCommand} from '../command'
import {JobModel} from '../../api/job'

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
