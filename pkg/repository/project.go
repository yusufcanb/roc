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
	var projectMap map[string]string
	projectList := make([]types.Project, 5)
	pipeline := rdb.Pipeline()
	projectKeys := rdb.Keys(ctx, "project.*")
	for _, key := range projectKeys.Val() {
		projectMap = pipeline.HGetAll(ctx, key).Val()
		project := new(types.Project)
		project.FromMap(projectMap)
		projectList = append(projectList, *project)
	}

	return &projectList
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
