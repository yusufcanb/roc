package repository

import (
	"fmt"

	"github.com/gosimple/slug"
	"github.com/yusufcanb/roc/pkg/types"
)

func GetProjectKey(id string) string {
	return fmt.Sprintf(projectKey, id)
}

func ProjectExists(id string) bool {
	return CheckKeyExists(GetProjectKey(id))
}

func SaveProject(project *types.Project) error {
	project.Id = slug.Make(project.Name)
	projectMap := project.AsMap()

	projectKey := GetProjectKey(project.Id)
	status := rdb.HSet(ctx, projectKey, projectMap)
	if status.Err() != nil {
		return status.Err()
	} else {
		rdb.Publish(ctx, "project.created", project.Id)
		return nil
	}
}

func GetProjectList() *[]types.Project {
	var projectMap map[string]string
	projectList := make([]types.Project, 0)
	projectKeys := rdb.Keys(ctx, "project.*")
	for _, key := range projectKeys.Val() {
		projectMap = rdb.HGetAll(ctx, key).Val()
		project := new(types.Project)
		project.FromMap(projectMap)
		projectList = append(projectList, *project)
	}

	return &projectList
}

func GetProjectById(id string) (*types.Project, error) {
	key := GetProjectKey(id)
	ret := rdb.HGetAll(ctx, key)
	err := ret.Err()
	if err != nil {
		return nil, err
	}
	p := types.Project{}
	p.FromMap(ret.Val())
	return &p, nil
}

func DeleteProjectById(id string) (bool, error) {
	key := GetProjectKey(id)
	cmd := rdb.Del(ctx, key)
	if cmd.Err() != nil {
		return false, cmd.Err()
	}
	return true, nil
}

func UpdateProject(id string, project types.Project) types.Project {
	panic("Not implemented yet!")
}
