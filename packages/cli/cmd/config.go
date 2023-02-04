package cmd

import (
	"fmt"

	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

// configCmd represents the config command
var configCmd = &cobra.Command{
	Use:   "config",
	Short: "ROC CLI execution configuration for setting the platform url, default project etc..",
	Run: func(cmd *cobra.Command, args []string) {
		cmd.Help()
	},
}

// configCmd represents the config command
var platformCmd = &cobra.Command{
	Use:   "platform",
	Short: "platform url configuration",
	Run: func(cmd *cobra.Command, args []string) {
		cmd.Help()
	},
}

var platformSetCmd = &cobra.Command{
	Use:   "set",
	Short: "Set Platform URL of your ROC deployment",
	Args:  cobra.MinimumNArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		url := args[0]
		viper.Set("platform_url", url)
		err := viper.WriteConfig()
		if err != nil {
			log.Fatal(err)
		}
		log.Infof("OK.. Platform URL set. [%s]", url)

	},
}

var platformGetCmd = &cobra.Command{
	Use:   "get",
	Short: "print platform url",
	Run: func(cmd *cobra.Command, args []string) {
		url := viper.GetString("platform_url")
		if url == "" {
			fmt.Println("Platform URL not set")
		}
	},
}

// configCmd represents the config command
var defaultProjectCmd = &cobra.Command{
	Use:   "project",
	Short: "default project configuration.",
	Run: func(cmd *cobra.Command, args []string) {
		cmd.Help()
	},
}

var defaultProjectSetCmd = &cobra.Command{
	Use:   "set",
	Short: "set default project",
	Args:  cobra.MinimumNArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		project := args[0]
		viper.Set("project", project)
		err := viper.WriteConfig()
		if err != nil {
			log.Fatal(err)
		}
		log.Infof("OK.. Default project set. [%s]", project)
	},
}

var defaultProjectGetCmd = &cobra.Command{
	Use:   "get",
	Short: "print default project",
	Run: func(cmd *cobra.Command, args []string) {
		project := viper.GetString("project")
		if project == "" {
			fmt.Println("Default project not set")
		}
		log.Info("Default Project: ", project)
	},
}

func init() {

	platformCmd.AddCommand(platformGetCmd)
	platformCmd.AddCommand(platformSetCmd)

	defaultProjectCmd.AddCommand(defaultProjectGetCmd)
	defaultProjectCmd.AddCommand(defaultProjectSetCmd)

	configCmd.AddCommand(platformCmd)
	configCmd.AddCommand(defaultProjectCmd)

	rootCmd.AddCommand(configCmd)

}
