import axios from "axios"

interface Project {
  "Id": string;
  "Name": string;
  "Created At": Date;
}

export async function getProjects(): Promise<Project[]> {
  const response = await axios.get<Array<any>>("http://localhost:8080/project")
  const projects: Project[] = []

  response.data.forEach(p => projects.push({
    "Id": p.slug,
    "Name": p.name,
    "Created At": new Date(p.createdAt)
  }))

  return projects
}

export async function createProject(name: string): Promise<number> {
  const response = await axios.post<Array<any>>("http://localhost:8080/project", {
    name: name
  })

  console.debug(response.data)
  return response.status
}
