package types

type TaskForce struct {
	Id        string   `json:"id"`
	ProjectId string   `json:"projectId"`
	Name      string   `json:"name"`
	Runner    string   `json:"runner"`
	Tasks     []string `json:"tasks"`
}
