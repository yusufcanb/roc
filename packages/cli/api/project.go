package api

import (
	"fmt"
)

func getProjects(baseUrl string) {
	projectBaseUrl := fmt.Sprintf("%s/project", baseUrl)
	client.R().Get(projectBaseUrl)
}

func getProjectById(baseUrl string, id string) {
	client.NewRequest(fmt.Sprintf("%s/project", baseUrl))
}

func updateProjectById(baseUrl string, id string) {
	client.NewRequest(fmt.Sprintf("%s/project/%s", baseUrl, id))
}

func deleteProjectById(baseUrl string, id string) {
	client.NewRequest(fmt.Sprintf("%s/project/%s", baseUrl, id))
}
