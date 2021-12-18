import axios from "axios"


export async function getAgentsByProject(projectId: string) {
  const response = await axios.get("http://localhost:8080/agent", {
    params: {
      projectId: projectId
    }
  })
  return response.data
}

export async function createAgent(projectId: string, name: string, os: string = "Linux") {
  const requestConfig = {
    params: {
      projectId: projectId
    }
  }

  const requestData = {
    displayName: name,
    os: os
  }

  const response = await axios.post("http://localhost:8080/agent", requestData, requestConfig)
  return response.status
}
