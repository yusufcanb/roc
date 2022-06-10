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

func CheckKeyExists(key string) bool {
	cmd := rdb.Exists(ctx, key)
	if cmd.Val() == 0 {
		return false
	} else {
		return true
	}
}
