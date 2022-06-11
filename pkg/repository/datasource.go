package repository

import (
	"context"

	"github.com/go-redis/redis/v8"
)

var ctx = context.Background()
var rdb = redis.NewClient(&redis.Options{
	Addr:     "localhost:6379",
	Password: "", // no password set
	DB:       0,  // use default DB
})

var projectKey = "project.%s"
var agentKey = "agent.%s"
var environmentKey = "environment.%s"
var taskForceKey = "task-force.%s"
var jobKey = "job.%s"

func CheckKeyExists(key string) bool {
	cmd := rdb.Exists(ctx, key)
	if cmd.Val() == 0 {
		return false
	} else {
		return true
	}
}
