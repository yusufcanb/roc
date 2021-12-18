import axios from "axios"


export async function getAgentsByProject(projectName: string) {
  const response = await axios.get("http://localhost:8080/agent")
  return response.data
}
