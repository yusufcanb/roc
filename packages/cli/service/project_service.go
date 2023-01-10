package service

import (
	"fmt"
	"log"

	"github.com/yusufcanb/roc-cli/api"
	"github.com/yusufcanb/roc-cli/spec"
	"github.com/yusufcanb/roc-cli/utils"
)

type projectService struct {
	client *api.APIClient
}

func (it *projectService) isExists(project api.Project) bool {
	// project, _, err := it.client.ProjectApi.GetProjectById(project.Id)
	// if err != nil {
	// 	return false
	// } else {
	// 	return true
	// }
	return false
}

func (it *projectService) createProject(project api.Project) {

}

func (it *projectService) updateProject(project api.Project) {

}

func (it *projectService) ApplyCLISpec(applySpec *spec.CLIApplySpec) {
	var p api.Project
	err := utils.MapToStruct(applySpec.Spec, &p)
	if err != nil {
		log.Fatalf("Error casting spec to ApplySpec as TaskForce kind")
	}
	fmt.Printf("%v\n", p)
	if it.isExists(p) {
		it.updateProject(p)
	} else {
		it.createProject(p)
	}
}

func NewProjectService(client *api.APIClient) projectService {
	ps := projectService{}
	ps.client = client
	return ps
}
