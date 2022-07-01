package agent

import (
	"context"
	"errors"
	"log"

	docker "github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"github.com/yusufcanb/roc/pkg/types"
)

var ctx = context.Background()
var cli, _ = client.NewClientWithOpts(client.FromEnv)

func pullRobotExecutionImage(imageName string) {
	out, err := cli.ImagePull(ctx, imageName, docker.ImagePullOptions{})
	if err != nil {
		panic(err)
	}
	defer out.Close()
}

func ExecuteTaskForce(taskForce *types.TaskForce) error {
	log.Println("Executing task force: ", taskForce.Id)
	if taskForce == nil {
		return errors.New("Hello")
	}
	pullRobotExecutionImage(taskForce.Runner)
	return nil
}
