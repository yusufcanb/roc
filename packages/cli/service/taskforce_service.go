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

type TaskForceService struct {
	client *api.APIClient
}

func (it *TaskForceService) GetTaskForcesByProjectId(projectId string) {
	taskForces, _, err := it.client.TaskForceApi.GetTaskForces(context.Background(), projectId)
	if err != nil {
		log.Fatalf(err.Error())
	}

	if len(taskForces) == 0 {
		log.Printf("No task forces exist on Project<%s>", projectId)
		return
	}

	it.PrintTaskForcesAsTable(taskForces)
}

func (it *TaskForceService) GetTaskForceById(projectId string, taskForceId string) {
	environment, _, err := it.client.EnvironmentApi.GetEnvironmentById(context.Background(), projectId, taskForceId)
	if err != nil {
		log.Fatalf(err.Error())
	}

	utils.PrintAsYAML(environment)
}

func (it *TaskForceService) IsExists(projectId string, taskForce api.TaskForce) bool {
	_, response, err := it.client.EnvironmentApi.GetEnvironmentById(context.Background(), projectId, taskForce.Id)
	if err != nil && response == nil {
		log.Fatalf("ERR.. Error on checking TaskForce<Id=%s> is exist...\n%s", taskForce.Id, err.Error())
	}

	if response.StatusCode == 200 {
		log.Debug("OK.. TaskForce<Id=%s> is found.\n", taskForce.Id)
		return true
	} else {
		log.Debug("OK.. TaskForce<Id=%s> is not found.\n", taskForce.Id)
		return false
	}
}

func (it *TaskForceService) CreateTaskForce(projectId string, taskForce api.TaskForce) {
	_, response, err := it.client.TaskForceApi.CreateTaskForce(context.Background(), taskForce, projectId)
	if err != nil && response == nil {
		log.Fatalf("ERR.. Error on task force creation...\n%s", err.Error())
	}

	if response.StatusCode != 201 {
		log.Fatalf("ERR.. task force creation failed...\n%s", err.Error())
	}

	log.Printf("OK.. TaskForce<Id=%s> created\n", taskForce.Id)
}

func (it *TaskForceService) UpdateTaskForce(projectId string, taskForce api.TaskForce) {
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

	log.Printf("OK.. TaskForce<Id=%s> updated\n", taskForce.Id)
}

func (it *TaskForceService) DeleteTaskForceById(projectId string, taskForceId string) {
	response, err := it.client.EnvironmentApi.DeleteEnvironment(context.Background(), projectId, taskForceId)
	if err != nil && response == nil {
		log.Fatalf("ERR.. Error on task force deletion...\n%s", err.Error())
	}

	if response.StatusCode != 200 {
		log.Fatalf("ERR.. Error while deleting the TaskForce<Id=%s>...\n", taskForceId)
	}

	log.Printf("OK.. TaskForce<Id=%s> deleted\n", taskForceId)
}

func (it *TaskForceService) PrintTaskForcesAsTable(taskForces []api.TaskForce) {
	tw := table.NewWriter()
	rowHeader := table.Row{"Id", "Description", "Repository"}
	tw.AppendHeader(rowHeader)

	rows := make([]table.Row, len(taskForces))
	for _, e := range taskForces {
		rows = append(rows, table.Row{e.Id, e.Description, e.Repository})
	}

	tw.AppendRows(rows)

	tw.SetIndexColumn(1)
	tw.SetTitle("Task Forces")

	fmt.Println(tw.Render())
}

func (it *TaskForceService) ApplyCLISpec(projectId string, applySpec *spec.CLIApplySpec) {
	var taskForce api.TaskForce
	err := utils.MapToStruct(applySpec.Spec, &taskForce)
	if err != nil {
		log.Fatalf("Error casting spec to ApplySpec as TaskForce kind")
	}
	if it.IsExists(projectId, taskForce) {
		it.UpdateTaskForce(projectId, taskForce)
	} else {
		it.CreateTaskForce(projectId, taskForce)
	}
}

func NewTaskForceService(client *api.APIClient) TaskForceService {
	taskForceService := TaskForceService{}
	taskForceService.client = client
	return taskForceService
}
