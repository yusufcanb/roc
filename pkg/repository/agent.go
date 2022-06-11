package repository

import (
	"fmt"

	"github.com/docker/docker/pkg/namesgenerator"
	"github.com/yusufcanb/roc/pkg/types"
)

func GetAgentKey(id string) string {
	return fmt.Sprintf(agentKey, id)
}

func GetAgents() *[]types.Agent {
	var agentMap map[string]string
	agentList := make([]types.Agent, 0)
	agentKeys := rdb.Keys(ctx, "agent.*")
	for _, key := range agentKeys.Val() {
		agentMap = rdb.HGetAll(ctx, key).Val()
		project := new(types.Agent)
		project.FromMap(agentMap)
		agentList = append(agentList, *project)
	}

	return &agentList
}

func SaveAgent(agent *types.Agent) error {
	id := namesgenerator.GetRandomName(0)
	agent.Id = id
	cmd := rdb.HSet(ctx, GetAgentKey(id), agent.AsMap())

	if cmd.Err() != nil {
		return cmd.Err()
	}

	return nil
}
