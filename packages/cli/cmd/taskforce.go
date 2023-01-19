package cmd

import (
	"github.com/spf13/cobra"
)

// taskForceCmd represents the taskForce command
var taskForceCmd = &cobra.Command{
	Use:   "task-force",
	Short: "Task Force operations. (list, retrieve, delete)",
	Run: func(cmd *cobra.Command, args []string) {
		cmd.Help()
	},
}

var taskForceListCmd = &cobra.Command{
	Use:   "list",
	Short: "Get a list of task forces by project",
	Run: func(cmd *cobra.Command, args []string) {
		projectId := getProjectFromFlag(cmd)
		taskForceService.GetTaskForcesByProjectId(projectId)
	},
}

var taskForceDetailCmd = &cobra.Command{
	Use:   "get",
	Short: "taskForce get",
	Run: func(cmd *cobra.Command, args []string) {
		projectId := getProjectFromFlag(cmd)
		taskForceService.GetTaskForceById(projectId, args[0])
	},
}

var taskForceDeleteCmd = &cobra.Command{
	Use:   "delete",
	Short: "Delete an taskForce by its id",
	Run: func(cmd *cobra.Command, args []string) {
		projectId := getProjectFromFlag(cmd)
		taskForceService.DeleteTaskForceById(projectId, args[0])
	},
}

func init() {
	taskForceCmd.AddCommand(taskForceListCmd)
	taskForceCmd.AddCommand(taskForceDetailCmd)
	taskForceCmd.AddCommand(taskForceDeleteCmd)
	rootCmd.AddCommand(taskForceCmd)

	taskForceCmd.PersistentFlags().StringP("project", "p", "", "Project identifier. e.g default-project")
	taskForceCmd.MarkPersistentFlagRequired("project")
}
