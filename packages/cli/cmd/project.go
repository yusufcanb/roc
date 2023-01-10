/*
 *   Copyright (c) 2021-2022 Yusuf Can Bayrak <yusufcanbayrak@gmail.com>
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 *   Contributors:
 *   Yusuf Can Bayrak - initial implementation and documentation.
 *
 */

package cmd

import (
	"context"

	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
	"github.com/yusufcanb/roc-cli/api"
	"github.com/yusufcanb/roc-cli/service"
)

var apiClient *api.APIClient
var projectService service.ProjectService
var ctx context.Context = context.Background()

// projectCmd represents the project command
var projectCmd = &cobra.Command{
	Use:   "project",
	Short: "Project operations (list, retrieve, delete)",
	Run: func(cmd *cobra.Command, args []string) {
		cmd.Help()
	},
}

var projectListCmd = &cobra.Command{
	Use:   "list",
	Short: "List all projects",
	Run: func(cmd *cobra.Command, args []string) {
		ctx := context.Background()

		projects, _, err := apiClient.ProjectApi.GetProjects(ctx)
		if err != nil {
			log.Fatalf(err.Error())
		}

		projectService.PrintProjectsAsTable(projects)
	},
}

var projectGetCmd = &cobra.Command{
	Use:   "get",
	Short: "Retrieve project by its id",
	Run: func(cmd *cobra.Command, args []string) {

		if !(len(args) > 0) {
			log.Fatalf("project id is not provided")
		}

		project, _, err := apiClient.ProjectApi.GetProjectById(ctx, args[0])
		if err != nil {
			log.Println(err.Error())
		}

		projectService.PrintProjectAsYAML(&project)
	},
}

var projectCreateCmd = &cobra.Command{
	Use:   "delete",
	Short: "Delete project by its id",
	Run: func(cmd *cobra.Command, args []string) {
		projectService.DeleteProjectById(args[0])
	},
}

func init() {

	config := api.NewConfiguration()
	config.BasePath = "http://localhost:3000/api/v1"

	apiClient = api.NewAPIClient(config)
	projectService = service.NewProjectService(apiClient)

	projectCmd.AddCommand(projectListCmd)
	projectCmd.AddCommand(projectGetCmd)
	projectCmd.AddCommand(projectCreateCmd)

	rootCmd.AddCommand(projectCmd)
}
