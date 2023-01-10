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
	"fmt"
	"io/ioutil"
	"log"

	"github.com/spf13/cobra"
	"github.com/yusufcanb/roc-cli/api"
	"github.com/yusufcanb/roc-cli/utils"
	"gopkg.in/yaml.v2"
)

// projectCmd represents the project command
var projectCmd = &cobra.Command{
	Use:   "project",
	Short: "A brief description of your command",
	Run: func(cmd *cobra.Command, args []string) {
		cmd.Help()
	},
}

var projectListCmd = &cobra.Command{
	Use:   "list",
	Short: "List projects",
	Run: func(cmd *cobra.Command, args []string) {
		ctx := context.Background()

		config := api.NewConfiguration()
		config.BasePath = "http://localhost:3000/api/v1"
		api := api.NewAPIClient(config)

		projects, _, err := api.ProjectApi.GetProjects(ctx)
		if err != nil {
			fmt.Println(err.Error())
		}

		if err := utils.PrintYAML(projects); err != nil {
			fmt.Println(err)
			return
		}
	},
}

var projectCreateCmd = &cobra.Command{
	Use:   "create",
	Short: "Create new project",
	Run: func(cmd *cobra.Command, args []string) {
		// Get the file path from the command-line arguments
		if len(args) < 1 {
			log.Fatalf("No file path provided")
		}
		filePath := args[0]

		// Read the YAML file
		data, err := ioutil.ReadFile(filePath)
		if err != nil {
			log.Fatalf("Error reading YAML file: %s", err)
		}

		// Unmarshal the YAML data into a slice of Projects
		var projects []api.Project
		if err := yaml.Unmarshal(data, &projects); err != nil {
			log.Fatalf("Error unmarshalling YAML data: %s", err)
		}
	},
}

func init() {
	projectCmd.AddCommand(projectListCmd)
	projectCmd.AddCommand(projectCreateCmd)

	rootCmd.AddCommand(projectCmd)

}
