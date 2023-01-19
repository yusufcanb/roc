package cmd

import (
	"github.com/spf13/cobra"
)

// environmentCmd represents the environment command
var environmentCmd = &cobra.Command{
	Use:   "environment",
	Short: "Environment operations. (list, retrieve, delete)",
	Run: func(cmd *cobra.Command, args []string) {
		cmd.Help()
	},
}

var environmentListCmd = &cobra.Command{
	Use:   "list",
	Short: "Get environment list by project",
	Run: func(cmd *cobra.Command, args []string) {
		projectId := getProjectFromFlag(cmd)
		environmentService.GetEnvironmentsByProjectId(projectId)
	},
}

var environmentDetailCmd = &cobra.Command{
	Use:   "get",
	Short: "Get an environment detail by its id",
	Run: func(cmd *cobra.Command, args []string) {
		projectId := getProjectFromFlag(cmd)
		environmentService.GetEnvironmentById(projectId, args[0])
	},
}

var environmentDeleteCmd = &cobra.Command{
	Use:   "delete",
	Short: "Delete an environment by its id",
	Run: func(cmd *cobra.Command, args []string) {
		projectId := getProjectFromFlag(cmd)
		environmentService.DeleteEnvironmentById(projectId, args[0])
	},
}

func init() {
	environmentCmd.AddCommand(environmentListCmd)
	environmentCmd.AddCommand(environmentDetailCmd)
	environmentCmd.AddCommand(environmentDeleteCmd)
	rootCmd.AddCommand(environmentCmd)

	environmentCmd.PersistentFlags().StringP("project", "p", "", "Project identifier. e.g default-project")
	environmentCmd.MarkPersistentFlagRequired("project")
}
