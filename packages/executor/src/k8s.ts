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
  ExecutorResult,
  Id,
  RobotExecutor,
  RobotExecutorConfig,
  TaskForce,
} from '@roc/core';

import { createWriteStream, readFileSync } from 'fs';
import { parse } from 'path';

import yaml from 'yaml';
import * as k8s from '@kubernetes/client-node';

export class K8sRobotExecutor implements RobotExecutor {
  private executionId: Id;

  private k8sApi: k8s.CoreV1Api;
  private k8sExec: k8s.Exec;

  constructor() {
    // Create a Kubernetes client configuration object
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();

    // Create a Kubernetes API client using the configuration object
    this.k8sApi = kc.makeApiClient(k8s.CoreV1Api);
    this.k8sExec = new k8s.Exec(kc);
  }

  private _toBase64String(obj: any): string {
    const objectString = yaml.stringify(obj);
    const objectBuffer = Buffer.from(objectString);
    return objectBuffer.toString('base64');
  }

  private async _cloneTaskForceToContainer(
    pod: k8s.V1Pod,
    taskForce: TaskForce,
  ): Promise<any> {
    const path = `/opt/robotframework/${taskForce.projectId}.${taskForce.id}`;
    return await this._exec(pod, ['git', 'clone', taskForce.repository, path]);
  }

  private async _writeEnvironmentAsYAML(pod: k8s.V1Pod, variables: any) {
    return await this._exec(pod, [
      'bash',
      '-c',
      `echo "$(echo ${this._toBase64String(
        variables,
      )} | base64 -d)" >> /opt/robotframework/variables.yaml`,
    ]);
  }

  private async _executeTaskForceInContainer(
    pod: k8s.V1Pod,
    taskForce: TaskForce,
  ): Promise<any> {
    return await this._exec(pod, [
      'sh',
      '/opt/robotframework/bin/run-tests-in-virtual-screen.sh',
    ]);
  }

  private async _uploadArtifactsToMinio(
    pod: k8s.V1Pod,
    taskForce: TaskForce,
    config: RobotExecutorConfig,
  ): Promise<any> {
    return this._exec(pod, [
      'aws',
      `--endpoint-url=${config.minio.endpoint.toString()}`,
      's3',
      'sync',
      '/opt/robotframework/reports',
      `s3://${config.minio.bucket}/${taskForce.projectId}/${taskForce.id}/${this.executionId}`,
    ]);
  }

  private async _exec(pod: k8s.V1Pod, cmd: string[]): Promise<any> {
    const stdout = createWriteStream(`/tmp/${this.executionId}-stdout.txt`, {
      flags: 'a',
    });

    stdout.write('>>> ' + cmd.join(' ') + '\n\n');

    return new Promise((resolve, reject) => {
      const statusPromise = this.k8sExec.exec(
        pod.metadata.namespace,
        pod.metadata.name,
        pod.spec.containers[0].name,
        cmd,
        stdout,
        stdout,
        undefined,
        false,
        (status: k8s.V1Status) => {
          resolve(status);
        },
      );

      statusPromise.catch((err: any) => {
        reject(err);
      });
    });
  }

  private async createPod(namespace: string, config: RobotExecutorConfig) {
    // Define the container spec for the pod
    const container: k8s.V1Container = {
      name: `job-${this.executionId}`,
      image: (config.taskForce as TaskForce).runner,
      command: ['sleep', 'infinity'],
      imagePullPolicy: 'IfNotPresent',
      env: [
        { name: 'AWS_ACCESS_KEY_ID', value: config.minio.accessKey },
        { name: 'AWS_SECRET_ACCESS_KEY', value: config.minio.accessSecret },
        { name: 'AWS_BUCKET_NAME', value: config.minio.bucket },
        {
          name: 'ROBOT_TESTS_DIR',
          value: `/opt/robotframework/${
            (config.taskForce as TaskForce).projectId
          }.${(config.taskForce as TaskForce).id}/${
            (config.taskForce as TaskForce).selector
          }`,
        },
      ],
      securityContext: {
        runAsUser: 0,
      },
    };

    // Define the pod spec
    const podSpec: k8s.V1PodSpec = {
      containers: [container],
    };

    // Define the pod metadata
    const podMetadata = {
      name: `job-${this.executionId}`,
      namespace: namespace,
    };

    // Create the pod object
    const pod = {
      metadata: podMetadata,
      spec: podSpec,
    };

    // Create the pod in the Kubernetes cluster
    const response = await this.k8sApi.createNamespacedPod(namespace, pod);

    // Wait for the pod to be in the "Running" state before returning
    const podName = response.body.metadata?.name;
    if (podName) {
      while (true) {
        const podStatusResponse = await this.k8sApi.readNamespacedPodStatus(
          podName,
          namespace,
        );
        const podPhase = podStatusResponse.body.status?.phase;
        if (podPhase === 'Running') {
          response.body = podStatusResponse.body;
          break;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for 1 second before checking again
      }
    }
    return response.body;
  }

  private async deletePod(pod: k8s.V1Pod): Promise<void> {
    try {
      await this.k8sApi.deleteNamespacedPod(
        pod.metadata.namespace,
        pod.metadata.name,
      );
      console.log(`Pod ${pod} deleted in namespace ${pod.metadata.namespace}.`);
    } catch (err) {
      console.error(
        `Error deleting pod ${pod} in namespace ${pod.metadata.namespace}: ${err}`,
      );
    }
  }

  public async execute(config: RobotExecutorConfig): Promise<ExecutorResult> {
    this.executionId = config.jobId;
    const pod = await this.createPod('roc', config);

    await this._writeEnvironmentAsYAML(pod, config.environment.variables);
    await this._cloneTaskForceToContainer(pod, config.taskForce as TaskForce);
    await this._executeTaskForceInContainer(pod, config.taskForce as TaskForce);
    await this._uploadArtifactsToMinio(
      pod,
      config.taskForce as TaskForce,
      config,
    );

    await this.deletePod(pod);

    return {
      completedAt: new Date(),
      isErrored: false,
      isSucceeded: true,
      stdout: readFileSync(`/tmp/${this.executionId}-stdout.txt`).toString(
        'utf8',
      ),
      logUrl: parse(
        `/${(config.taskForce as TaskForce).projectId}/${
          (config.taskForce as TaskForce).id
        }/${config.jobId}/log.html`,
      ),
      reportUrl: parse(
        `/${(config.taskForce as TaskForce).projectId}/${
          (config.taskForce as TaskForce).id
        }/${config.jobId}/report.html`,
      ),
      outputUrl: parse(
        `/${(config.taskForce as TaskForce).projectId}/${
          (config.taskForce as TaskForce).id
        }/${config.jobId}/output.xml`,
      ),
    } as ExecutorResult;
  }

  public async executeMany(
    config: RobotExecutorConfig,
  ): Promise<ExecutorResult> {
    return null;
  }
}
