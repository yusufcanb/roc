import axios from "axios"


export async function getEnvironmentsByProject(projectId: string) {
  const response = await axios.get("http://localhost:8080/environment", {
    params: {
      projectId: projectId
    }
  })

  return response.data
}


export async function createEnvironment(projectId: string, dto: { code: string; name: string; description: string }) {
  const requestConfig = {
    params: {
      projectId: projectId
    }
  }

  const response = await axios.post("http://localhost:8080/environment", dto, requestConfig)
  return response.status
}
