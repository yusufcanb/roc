package cmd

import (
	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

// configCmd represents the config command
var configCmd = &cobra.Command{
	Use:   "config",
	Short: "A brief description of your command",
	Run: func(cmd *cobra.Command, args []string) {
		cmd.Help()
	},
}

var setPlatformCmd = &cobra.Command{
	Use:   "set-platform",
	Short: "A brief description of your command",
	Run: func(cmd *cobra.Command, args []string) {
		viper.Set("platform.url", args[0])
		err := viper.WriteConfig()
		if err != nil {
			log.Fatal(err)
		}
	},
}

var getPlatformCmd = &cobra.Command{
	Use:   "get-platform",
	Short: "A brief description of your command",
	Run: func(cmd *cobra.Command, args []string) {
		viper.Get("platform.url")
	},
}

func init() {

	configCmd.AddCommand(getPlatformCmd)
	configCmd.AddCommand(setPlatformCmd)

	rootCmd.AddCommand(configCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// configCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// configCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
