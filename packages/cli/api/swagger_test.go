package api_test

import (
	"context"
	"fmt"
	"os"
	"testing"
	"text/tabwriter"

	"github.com/yusufcanb/roc-cli/api"
)

func Test_NewAPICLient(t *testing.T) {
	ctx := context.Background()
	config := api.NewConfiguration()
	config.BasePath = "http://localhost:3000/api/v1"

	client := api.NewAPIClient(config)
	projects, _, _ := client.ProjectApi.GetProjects(ctx)

	w := tabwriter.NewWriter(os.Stdout, 0, 0, 2, ' ', tabwriter.AlignRight)
	fmt.Fprintln(w, "ID\tDescription\tCreated At")

	for _, v := range projects {
		fmt.Fprintf(w, "%s\t%s\t%s\n", v.Id, v.Description, v.CreatedAt)
		environments, _, err := client.EnvironmentApi.GetEnvironments(ctx, v.Id)
		if err != nil {
			t.Fatal(err.Error())
		}
		for _, e := range environments {
			fmt.Println(e.Id)
		}
	}

	w.Flush()
}
