import {API} from "./base";

interface Project {
  "Id": string;
  "Name": string;
  "Created At": Date;
}

export class ProjectAPI extends API {
  async getProjects(): Promise<Project[]> {
    const response = await this.http.get<Array<any>>("/project")
    const projects: Project[] = []

    response.data.forEach(p => projects.push({
      "Id": p.slug,
      "Name": p.name,
      "Created At": new Date(p.createdAt)
    }))

    return projects
  }

  async createProject(name: string): Promise<number> {
    const response = await this.http.post<Array<any>>("/project", {
      name: name
    })

    console.debug(response.data)
    return response.status
  }
}


