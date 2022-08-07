import {BaseService} from './base'
import Docker from 'dockerode'

export class DockerService extends BaseService {
  private docker: Docker = new Docker()

  async getDockerVersion(): Promise<string> {
    const version = await this.docker.version()
    return version.Version
  }

  createContainer(image: string) {
    this.docker.createContainer({
      Image: image,
      Volumes: {
        '/stuff': {},
      },
      HostConfig: {
        Binds: ['./test:/stuff'],
      },
    }, (err: any, container: any) => {
      container.attach({
        stream: true,
        stdout: true,
        stderr: true,
        tty: true,
      }, (err: any, stream: any) => {
        stream.pipe(process.stdout)
        container.start((err: any, data: any) => {
          console.log(data)
        })
      })
    })
  }
}
