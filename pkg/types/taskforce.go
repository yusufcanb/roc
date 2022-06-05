package types

type TaskForce struct {
	Id        string `json: "id"`
	ProjectId string
	Name      string
	Runner    string
	Tasks     []string
}
