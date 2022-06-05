package types

import "encoding/json"

type Job struct {
	Id            string `json: "id"`
	ProjectId     string `json: "projectId"`
	AgentId       string `json: "agentId"`
	EnvironmentId string `json: "environmentId"`
	TaskForceId   string `json: "taskForceId"`
	CreatedAt     string `json: "createdAt"`
	Status        string `json: "status"`
}

func (it *Job) AsJson() string {
	b, err := json.Marshal(it)
	if err != nil {
		panic("Unable to marshal object")
	}
	return string(b)
}
