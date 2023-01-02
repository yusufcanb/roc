/*
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
import {
  Environment,
  RobotExecutor,
  RobotExecutorConfig,
  TaskForce,
} from '@roc/core';
import Docker from 'dockerode';

export class DockerRobotExecutor implements RobotExecutor {
  private readonly docker = new Docker({ socketPath: '/var/run/docker.sock' });

  private async _exec(container: Docker.Container, cmd: string[]) {
    const exec = await container.exec({
      Cmd: cmd,
    });

    const stream = await exec.start({});
    await container.modem.demuxStream(stream, process.stdout, process.stderr);

    while ((await exec.inspect()).Running) {
      continue;
    }

    return await exec.inspect();
  }

  async execute(
    environment: Environment,
    taskForce: TaskForce,
    config?: RobotExecutorConfig,
  ): Promise<void> {
    const container = await this.docker.createContainer({
      Image: taskForce.runner,
      Env: [
        `AWS_ACCESS_KEY_ID=${config.minio.accessKey}`,
        `AWS_SECRET_ACCESS_KEY=${config.minio.accessSecret}`,
        `AWS_BUCKET_NAME=${config.minio.bucket}`,
      ],
    });
    await container.start();

    const result = await this._exec(container, ['ls']);
    console.log(result);
  }
  executeMany(
    environment: Environment,
    taskForce: TaskForce,
    config?: RobotExecutorConfig,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
