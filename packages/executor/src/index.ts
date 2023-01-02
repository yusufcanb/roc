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
import { createWriteStream } from 'fs';

export class DockerRobotExecutor implements RobotExecutor {
  private readonly docker = new Docker({ socketPath: '/var/run/docker.sock' });

  private async _cloneTaskForceToContainer(
    container: Docker.Container,
    taskForce: TaskForce,
  ): Promise<Docker.ExecInspectInfo> {
    const path = `/opt/${taskForce.projectId}/${taskForce.id}`;
    return await this._exec(container, [
      'git',
      'clone',
      taskForce.repository,
      path,
    ]);
  }

  private async _executeTaskForceInContainer(
    container: Docker.Container,
    taskForce: TaskForce,
  ): Promise<Docker.ExecInspectInfo> {
    return await this._exec(container, [
      'sh',
      '/opt/robotframework/bin/run-tests-in-virtual-screen.sh',
    ]);
  }

  private async _uploadArtifactsToMinio(
    container: Docker.Container,
    taskForce: TaskForce,
    config: RobotExecutorConfig,
  ): Promise<Docker.ExecInspectInfo> {
    return await this._exec(container, [
      'aws',
      `--endpoint-url=${config.minio.endpoint.toString()}`,
      's3',
      'sync',
      '/opt/robotframework/reports',
      `s3://${config.minio.bucket}/robot-reports/`,
    ]);
  }

  private async _exec(
    container: Docker.Container,
    cmd: string[],
  ): Promise<Docker.ExecInspectInfo> {
    const exec = await container.exec({
      Cmd: cmd,
      AttachStderr: true,
      AttachStdin: true,
      AttachStdout: true,
    });

    const execStream = await exec.start({});

    const stdout = createWriteStream(`${cmd[0]}-stdout.txt`);
    const stderr = createWriteStream(`${cmd[0]}-stderr.txt`);
    await container.modem.demuxStream(execStream, stdout, stderr);

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
      HostConfig: {
        NetworkMode: 'host',
      },
      Env: [
        `AWS_ACCESS_KEY_ID=${config.minio.accessKey}`,
        `AWS_SECRET_ACCESS_KEY=${config.minio.accessSecret}`,
        `AWS_BUCKET_NAME=${config.minio.bucket}`,
        `ROBOT_TESTS_DIR=/opt/${taskForce.projectId}/${taskForce.id}/${taskForce.selector}`,
      ],
      Cmd: ['sleep', 'infinity'],
      User: 'root',
    });
    await container.start();

    console.log(await this._cloneTaskForceToContainer(container, taskForce));
    console.log(await this._executeTaskForceInContainer(container, taskForce));
    console.log(
      await this._uploadArtifactsToMinio(container, taskForce, config),
    );

    await container.stop();
    await container.remove();
  }

  executeMany(
    environment: Environment,
    taskForce: TaskForce,
    config?: RobotExecutorConfig,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
