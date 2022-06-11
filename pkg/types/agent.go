package types

import (
	"encoding/json"
	"time"
)

type Agent struct {
	Id            string    `json:"id"`
	ProjectId     string    `json:"projectId"`
	Name          string    `json:"name"`
	HostName      string    `json:"hostname"`
	Platform      string    `json:"platform"`
	DockerVersion string    `json:"dockerVersion"`
	Version       string    `json:"version"`
	LastSeen      time.Time `json:"lastSeen"`
}

func (it *Agent) AsMap() map[string]interface{} {
	var agentMap map[string]interface{}
	data, _ := json.Marshal(it)
	json.Unmarshal(data, &agentMap)

	return agentMap
}

func (it *Agent) FromMap(agentMap map[string]string) error {
	data, _ := json.Marshal(agentMap)
	err := json.Unmarshal(data, it)

	if err != nil {
		return err
	}

	return nil
}
