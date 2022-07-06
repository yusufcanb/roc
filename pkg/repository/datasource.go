package repository

import (
	"context"

	"github.com/go-redis/redis/v8"
	"github.com/yusufcanb/roc/pkg/config"
	"github.com/yusufcanb/roc/pkg/types"
)

var ctx = context.Background()
var rdb = redis.NewClient(&redis.Options{
	Addr:     config.GetDBUrl(),
	Password: "", // no password set
	DB:       0,  // use default DB
})

var projectKey = "project.%s"
var agentKey = "agent.%s"
var environmentKey = "environment.%s"
var taskForceKey = "task-force.%s"
var jobKey = "job.%s"

func PingDB() error {
	cmd := rdb.Ping(ctx)
	if cmd.Err() != nil {
		return cmd.Err()
	}
	return nil
}

func CheckKeyExists(key string) bool {
	cmd := rdb.Exists(ctx, key)
	if cmd.Val() == 0 {
		return false
	} else {
		return true
	}
}

func PublishEvent(e types.Event) error {
	cmd := rdb.Publish(ctx, e.Key, e.Payload)
	if cmd.Err() != nil {
		return cmd.Err()
	}

	return nil
}
