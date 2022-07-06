package events

import "github.com/yusufcanb/roc/pkg/types"

var environmentCreatedEventKey string = "environment.created"
var environmentUpdatedEventKey string = "environment.updated"
var environmentDeletedEventKey string = "environment.deleted"

func EnvironmentCreatedEvent(environmentId string) *types.Event {
	event := types.Event{Key: environmentCreatedEventKey, Payload: environmentId}
	return &event
}

func EnvironmentUpdatedEvent(environmentId string) *types.Event {
	event := types.Event{Key: environmentUpdatedEventKey, Payload: environmentId}
	return &event
}

func EnvironmentDeletedEvent(environmentId string) *types.Event {
	event := types.Event{Key: environmentDeletedEventKey, Payload: environmentId}
	return &event
}
