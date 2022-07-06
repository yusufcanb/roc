package events

import "github.com/yusufcanb/roc/pkg/types"

var projectCreatedEventKey string = "project.created"
var projectUpdatedEventKey string = "project.updated"
var projectDeletedEventKey string = "project.deleted"

func ProjectCreatedEvent(projectId string) *types.Event {
	event := types.Event{Key: projectCreatedEventKey, Payload: projectId}
	return &event
}

func ProjectUpdatedEvent(projectId string) *types.Event {
	event := types.Event{Key: projectUpdatedEventKey, Payload: projectId}
	return &event
}

func ProjectDeletedEvent(projectId string) *types.Event {
	event := types.Event{Key: projectDeletedEventKey, Payload: projectId}
	return &event
}
