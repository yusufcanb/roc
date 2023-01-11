package service

import (
	"context"
	"fmt"

	"github.com/jedib0t/go-pretty/table"
	log "github.com/sirupsen/logrus"
	"github.com/yusufcanb/roc-cli/api"
	"github.com/yusufcanb/roc-cli/spec"
	"github.com/yusufcanb/roc-cli/utils"
)

type EnvironmentService struct {
	client *api.APIClient
}

func (it *EnvironmentService) GetEnvironmentsByProjectId(projectId string) {
	environments, _, err := it.client.EnvironmentApi.GetEnvironments(context.Background(), projectId)
	if err != nil {
		log.Fatalf(err.Error())
	}

	it.PrintEnvironmentsAsTable(environments)
}

func (it *EnvironmentService) GetEnvironmentById(projectId string, environmentId string) {
	environment, _, err := it.client.EnvironmentApi.GetEnvironmentById(context.Background(), projectId, environmentId)
	if err != nil {
		log.Fatalf(err.Error())
	}

	utils.PrintAsYAML(environment)
}

func (it *EnvironmentService) IsExists(projectId string, environment api.Environment) bool {
	_, response, err := it.client.EnvironmentApi.GetEnvironmentById(context.Background(), projectId, environment.Id)
	if err != nil && response == nil {
		log.Fatalf("Error on checking Project<Id=%s> is exist...\n%s", environment.Id, err.Error())
	}

	if response.StatusCode == 200 {
		log.Debug("Environment<Id=%s> is found.\n", environment.Id)
		return true
	} else {
		log.Debug("Environment<Id=%s> is not found.\n", environment.Id)
		return false
	}
}

func (it *EnvironmentService) CreateEnvironment(projectId string, environment api.Environment) {
	_, response, err := it.client.EnvironmentApi.CreateEnvironment(context.Background(), environment, projectId)
	if err != nil && response == nil {
		log.Fatalf("Error on environment creation...\n%s", err.Error())
	}

	if response.StatusCode != 201 {
		log.Fatalf("Environment creation failed...\n%s", err.Error())
	}

	log.Printf("OK.. Environment<Id=%s> created\n", environment.Id)
}

func (it *EnvironmentService) UpdateEnvironment(projectId string, environment api.Environment) {
	// body := make(map[string]interface{})
	// body["description"] = environment.Description
	// body["tags"] = environment.Tags

	// _, response, err := it.client.EnvironmentApi.UpdateEnvironment(context.Background(), body, environment.Id)
	// if err != nil && response == nil {
	// 	log.Fatalf("Error on project creation...\n%s", err.Error())
	// }

	// if response.StatusCode != 200 {
	// 	log.Fatalf("Error while updating Project<Id=%s>...\n", environment.Id)
	// }

	log.Printf("OK.. Project<Id=%s> updated\n", environment.Id)
}

func (it *EnvironmentService) DeleteEnvironmentById(projectId string, environmentId string) {
	response, err := it.client.EnvironmentApi.DeleteEnvironment(context.Background(), projectId, environmentId)
	if err != nil && response == nil {
		log.Fatalf("Error on environment deletion...\n%s", err.Error())
	}

	if response.StatusCode != 200 {
		log.Fatalf("Error while deleting the Environment<Id=%s>...\n", environmentId)
	}

	log.Printf("OK.. Environment<Id=%s> deleted\n", environmentId)
}

func (it *EnvironmentService) PrintEnvironmentsAsTable(environments []api.Environment) {
	tw := table.NewWriter()
	rowHeader := table.Row{"Id", "Description", "Tags"}
	tw.AppendHeader(rowHeader)

	rows := make([]table.Row, len(environments))
	for _, e := range environments {
		rows = append(rows, table.Row{e.Id, e.Description, e.Tags})
	}

	tw.AppendRows(rows)

	tw.SetIndexColumn(1)
	tw.SetTitle("Environments")

	fmt.Println(tw.Render())
}

func (it *EnvironmentService) ApplyCLISpec(projectId string, applySpec *spec.CLIApplySpec) {
	var e api.Environment
	err := utils.MapToStruct(applySpec.Spec, &e)
	if err != nil {
		log.Fatalf("Error casting spec to ApplySpec as TaskForce kind")
	}
	if it.IsExists(projectId, e) {
		it.UpdateEnvironment(projectId, e)
	} else {
		it.CreateEnvironment(projectId, e)
	}
}

func NewEnvironmentService(client *api.APIClient) EnvironmentService {
	es := EnvironmentService{}
	es.client = client
	return es
}
