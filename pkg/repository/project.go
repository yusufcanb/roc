package repository

import (
	"fmt"

	"github.com/yusufcanb/roc/pkg/types"
)

var keyStr = "project.%s"

func SaveProject(project types.Project) bool {
	jsonStr := project.AsJson()
	status := rdb.Set(ctx, fmt.Sprintf(keyStr, project.Id), jsonStr, 0)
	if status.Err() != nil {
		return false
	} else {
		rdb.Publish(ctx, "project.created", project.Id)
		return true
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
	ret := rdb.Get(ctx, fmt.Sprintf(keyStr, id))
	err := ret.Err()
	if err != nil {
		return nil, err
	} else {
		p := types.Project{}
		p.FromJson(ret.Val())
		return &p, nil
	}
}

func UpdateProject(id string, project types.Project) types.Project {
	panic("Not implemented yet!")
}
