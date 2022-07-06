package events

import "github.com/yusufcanb/roc/pkg/types"

var agentCreatedEventKey string = "agent.created"
var agentUpdatedEventKey string = "agent.updated"
var agentDeletedEventKey string = "agent.deleted"

var agentConnectedEventKey string = "agent.connected"
var agentPingEventKey string = "agent.ping"

func AgentCreatedEvent(agentId string) *types.Event {
	event := types.Event{Key: agentCreatedEventKey, Payload: agentId}
	return &event
}

func AgentUpdatedEvent(agentId string) *types.Event {
	event := types.Event{Key: agentUpdatedEventKey, Payload: agentId}
	return &event
}

func AgentDeletedEvent(agentId string) *types.Event {
	event := types.Event{Key: agentDeletedEventKey, Payload: agentId}
	return &event
}

func AgentConnectedEvent(agentId string) *types.Event {
	event := types.Event{Key: agentConnectedEventKey, Payload: agentId}
	return &event
}

func AgentPingEvent(agentId string) *types.Event {
	event := types.Event{Key: agentPingEventKey, Payload: agentId}
	return &event
}
