package service

import (
	"context"
	"fmt"

	"github.com/jedib0t/go-pretty/table"
	log "github.com/sirupsen/logrus"
	"gopkg.in/yaml.v2"

	"github.com/yusufcanb/roc-cli/api"
	"github.com/yusufcanb/roc-cli/spec"
	"github.com/yusufcanb/roc-cli/utils"
)

type ProjectService struct {
	client *api.APIClient
}

func (it *ProjectService) IsExists(project api.Project) bool {
	_, response, err := it.client.ProjectApi.GetProjectById(context.Background(), project.Id)
	if err != nil && response == nil {
		log.Fatalf("Error on checking Project<Id=%s> is exist...\n%s", project.Id, err.Error())
	}

	if response.StatusCode == 200 {
		log.Debug("Project<Id=%s> is found.\n", project.Id)
		return true
	} else {
		log.Debug("Project<Id=%s> is not found.\n", project.Id)
		return false
	}
}

func (it *ProjectService) CreateProject(project api.Project) {
	_, response, err := it.client.ProjectApi.CreateProject(context.Background(), project)
	if err != nil && response == nil {
		log.Fatalf("Error on project creation...\n%s", err.Error())
	}

	if response.StatusCode != 201 {
		log.Fatalf("Project creation failed...\n%s", err.Error())
	}

	log.Printf("OK.. Project<Id=%s> created\n", project.Id)
}

func (it *ProjectService) UpdateProject(project api.Project) {
	body := make(map[string]interface{})
	body["description"] = project.Description
	body["tags"] = project.Tags

	_, response, err := it.client.ProjectApi.UpdateProject(context.Background(), body, project.Id)
	if err != nil && response == nil {
		log.Fatalf("Error on project creation...\n%s", err.Error())
	}

	if response.StatusCode != 200 {
		log.Fatalf("Error while updating Project<Id=%s>...\n", project.Id)
	}

	log.Printf("OK.. Project<Id=%s> updated\n", project.Id)
}

func (it *ProjectService) DeleteProjectById(projectId string) {
	response, err := it.client.ProjectApi.DeleteProject(context.Background(), projectId)
	if err != nil && response == nil {
		log.Fatalf("Error on project deletion...\n%s", err.Error())
	}

	if response.StatusCode != 200 {
		log.Fatalf("Error while deleting the Project<Id=%s>...\n", projectId)
	}

	log.Printf("OK.. Project<Id=%s> deleted\n", projectId)
}

func (it *ProjectService) ApplyCLISpec(applySpec *spec.CLIApplySpec) {
	var p api.Project
	err := utils.MapToStruct(applySpec.Spec, &p)
	if err != nil {
		log.Fatalf("Error casting spec to ApplySpec as TaskForce kind")
	}
	if it.IsExists(p) {
		it.UpdateProject(p)
	} else {
		it.CreateProject(p)
	}
}

func (it *ProjectService) PrintProjectsAsTable(projects []api.Project) {
	tw := table.NewWriter()
	rowHeader := table.Row{"Id", "Description", "Tags", "Created At", "Updated At"}
	tw.AppendHeader(rowHeader)

	rows := make([]table.Row, len(projects))
	for _, p := range projects {
		rows = append(rows, table.Row{p.Id, p.Description, p.Tags, p.CreatedAt, p.UpdatedAt})
	}

	tw.AppendRows(rows)

	tw.SetIndexColumn(1)
	tw.SetTitle("Projects")

	fmt.Println(tw.Render())
}

func (it *ProjectService) PrintProjectAsYAML(project *api.Project) {
	// Marshal the value to YAML
	yamlData, err := yaml.Marshal(project)
	if err != nil {
		log.Fatalf("Error marshalling to YAML: %s", err)
	}

	// Print the YAML data to the console
	fmt.Println(string(yamlData))
}

func NewProjectService(client *api.APIClient) ProjectService {
	ps := ProjectService{}
	ps.client = client
	return ps
}
