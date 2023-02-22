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
import * as stream from 'stream';

import { parse } from 'path';
import yaml from 'yaml';
import * as k8s from '@kubernetes/client-node';
import { PassThrough } from 'stream';

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

  private async _exec(pod: k8s.V1Pod, cmd: string[]): Promise<any> {
    const stdout = createWriteStream(`./${this.executionId}-log.txt`, {
      flags: 'a',
    });

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

  private async createPod(namespace: string, image: string) {
    // Define the container spec for the pod
    const container = {
      name: `job-${this.executionId}`,
      image: image,
      command: ['sleep', 'infinity'],
    };

    // Define the pod spec
    const podSpec = {
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

  public async execute(config: RobotExecutorConfig): Promise<ExecutorResult> {
    this.executionId = config.jobId;
    const pod = await this.createPod('roc', config.taskForce.repository);
    const response = await this._exec(pod, ['ls', '/']);

    return response;
  }

  public async executeMany(
    config: RobotExecutorConfig,
  ): Promise<ExecutorResult> {
    return null;
  }
}
