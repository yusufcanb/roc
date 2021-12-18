import axios from "axios"

const endpoint = "http://localhost:8080/task-force"

export async function getTaskForcesByProject(projectId: string) {

  const response = await axios.get(endpoint, {
    params: {
      projectId: projectId
    }
  })
  return response.data
}

export async function createTaskForce(projectId: string, name: string, type: string, url: string) {
  const requestConfig = {
    params: {
      projectId: projectId
    }
  }

  const requestData = {
    displayName: name,
  }

  const response = await axios.post(endpoint, requestData, requestConfig)
  return response.status
}
