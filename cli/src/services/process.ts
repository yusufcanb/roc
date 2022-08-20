import childProcess, {Serializable} from 'child_process'

export class ProcessService {
  onError(err: Error): void {
    console.error(err)
  }

  onStdoutMessage(message: Serializable): void {
    console.log(message.toString())
  }

  onStderrMessage(message: Serializable): void {
    console.log(message.toString())
  }

  runCmd(cmd: string, args: string[] | undefined, callback: (err: Error) => void): void {
    // keep track of whether callback has been invoked to prevent multiple invocations
    const process = childProcess.spawn(cmd, args, {})
    let invoked = false

    process.stdout?.on('data', this.onStdoutMessage)
    process.stderr?.on('data', this.onStderrMessage)

    // listen for errors as they may prevent the exit event from firing
    process.on('error', (err: Error) => {
      if (invoked) return
      invoked = true
      callback(err)
    })

    // execute the callback once the process has finished running
    process.on('exit', (code: number) => {
      if (invoked) return
      invoked = true
      const err = code === 0 ? null : new Error(code.toString())
      callback(err as Error)
    })
  }

  runRobotWorker(image: string, robotsDir: string, variableFile: string, artifactsDir: string): void {
    this.runCmd('docker', [
      'run',
      '--interactive',
      '--rm',
      `--volume=${artifactsDir}:/opt/robotframework/reports:Z`,
      `--volume=${robotsDir}:/opt/robotframework/tests:Z`,
      `--volume=${variableFile}:/opt/robotframework/variables.yaml`,
      '--env=BROWSER=chrome',
      `${image}`,
    ], this.onError)
  }
}
