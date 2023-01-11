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
	Short: "Environment list",
	Run: func(cmd *cobra.Command, args []string) {
		projectId := getProjectFromFlag(cmd)
		environmentService.GetEnvironmentsByProjectId(projectId)
	},
}

var environmentDetailCmd = &cobra.Command{
	Use:   "get",
	Short: "Environment details",
	Run: func(cmd *cobra.Command, args []string) {
		projectId := getProjectFromFlag(cmd)
		environmentService.GetEnvironmentById(projectId, args[0])
	},
}

func init() {
	environmentCmd.AddCommand(environmentListCmd)
	environmentCmd.AddCommand(environmentDetailCmd)
	rootCmd.AddCommand(environmentCmd)

	environmentCmd.PersistentFlags().StringP("project", "p", "", "Project identifier. e.g default-project")
}
