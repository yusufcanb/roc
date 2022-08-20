import fs from 'fs'
import path from 'path'
import os from 'os'
import {BaseService} from './base'
import {ProcessService} from './process'

interface ExecutionDirectoryPaths {
  artifactsDir: string;
  robotsDir: string;
  variablesFile: string;
}

export class JobService extends BaseService {
  readonly processService = new ProcessService()

  createExecutionDirectory(jobId: string): ExecutionDirectoryPaths {
    const executionDir = path.join(os.tmpdir(), `job-${jobId}`)
    if (fs.existsSync(executionDir)) {
      fs.rmSync(executionDir, {recursive: true, force: true})
    }

    fs.mkdirSync(executionDir)

    const artifactsDir = path.join(executionDir, 'reports')
    fs.mkdirSync(artifactsDir)

    const robotsDir = path.join(executionDir, 'robots')
    fs.mkdirSync(robotsDir)

    const variablesFile = path.join(os.tmpdir(), `job-${jobId}`, 'variables.yaml')
    fs.writeFileSync(variablesFile, '')

    return {
      artifactsDir,
      robotsDir,
      variablesFile,
    }
  }

  uploadArtifacts(jobId: string): void {
    throw new Error(`jobid=${jobId}`)
  }

  updateJobStatus(jobId: string): void {
    throw new Error(`jobid=${jobId}`)
  }

  executeJobByJobId(jobId: string): Promise<string> {
    return new Promise(
      resolve => {
        const paths = this.createExecutionDirectory(jobId)
        this.processService.runRobotWorker('ghcr.io/yusufcanb/roc-runner', paths.robotsDir, paths.variablesFile, paths.artifactsDir)
        resolve(jobId)
      })
  }
}
