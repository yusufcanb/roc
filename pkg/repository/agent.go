package repository

import (
	"fmt"

	"github.com/docker/docker/pkg/namesgenerator"
	"github.com/yusufcanb/roc/pkg/types"
)

func getAgentKey(id string) string {
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
	id := namesgenerator.GetRandomName(1)
	cmd := rdb.HSet(ctx, getAgentKey(id), agent.AsMap())

	if cmd.Err() != nil {
		return cmd.Err()
	}

	return nil
}
