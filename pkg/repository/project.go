package repository

import (
	"fmt"

	"github.com/yusufcanb/roc/pkg/types"
)

var keyStr = "project.%s"

func SaveProject(project types.Project) (bool, error) {
	projectMap := project.AsMap()
	projectKey := fmt.Sprintf(keyStr, project.Id)
	status := rdb.HSet(ctx, projectKey, projectMap)
	if status.Err() != nil {
		return false, status.Err()
	} else {
		rdb.Publish(ctx, "project.created", project.Id)
		return true, nil
	}
}

func GetProjectList() *[]types.Project {
	projectSlice := make([]types.Project, 5)
	projectKeys := rdb.Keys(ctx, "project.*")
	for _, key := range projectKeys.Val() {
		projectSlice = append(projectSlice, types.Project{Name: key})
	}
	return &projectSlice
}

func GetProjectById(id string) (*types.Project, error) {
	ret := rdb.HGetAll(ctx, fmt.Sprintf(keyStr, id))
	err := ret.Err()
	if err != nil {
		return nil, err
	}
	p := types.Project{}
	p.FromMap(ret.Val())
	return &p, nil
}

func UpdateProject(id string, project types.Project) types.Project {
	panic("Not implemented yet!")
}
