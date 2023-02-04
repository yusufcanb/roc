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
	"os"
	"path"

	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
	"github.com/yusufcanb/roc-cli/api"
	"github.com/yusufcanb/roc-cli/service"
)

var cfgFile string
var apiClient *api.APIClient

var projectService service.ProjectService
var environmentService service.EnvironmentService
var taskForceService service.TaskForceService
var jobService service.JobService

var ctx context.Context = context.Background()

// rootCmd represents the base command when called without any subcommands
var rootCmd = &cobra.Command{
	Use:     "roc-cli",
	Short:   "ROC command line interface to manage your platform",
	Version: "1.0.0",
	// Uncomment the following line if your bare application
	// has an action associated with it:
	Run: func(cmd *cobra.Command, args []string) {
		cmd.Help()
	},
}

// Execute adds all child commands to the root command and sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute() {
	err := rootCmd.Execute()
	if err != nil {
		os.Exit(1)
	}
}

func init() {
	cobra.OnInitialize(initConfig)
	// Here you will define your flags and configuration settings.
	// Cobra supports persistent flags, which, if defined here,
	// will be global for your application.

	rootCmd.PersistentFlags().StringVar(&cfgFile, "config", "", "config file (default is $HOME/.roc-cli.yaml)")
}

// initConfig reads in config file and ENV variables if set.
func initConfig() {
	if cfgFile != "" {
		// Use config file from the flag.
		viper.SetConfigFile(cfgFile)
	} else {
		// Find home directory.
		home, err := os.UserHomeDir()
		cobra.CheckErr(err)

		// Search config in home directory with name ".roc-cli" (without extension).
		viper.AddConfigPath(home)
		viper.SetConfigType("yaml")
		viper.SetConfigName(".roc-cli")

		if _, err := os.Stat(path.Join(home, ".roc-cli.yaml")); os.IsNotExist(err) {
			file, err := os.Create(path.Join(home, ".roc-cli.yaml"))
			if err != nil {
				log.Fatal("Error creating config file: ", err)
			}
			file.Close()
		}
	}

	// If a config file is found, read it in.
	if err := viper.ReadInConfig(); err == nil {
		log.Debug("Using config file:", viper.ConfigFileUsed())
	}

	config := api.NewConfiguration()
	config.BasePath = viper.GetString("platform_url")
	log.Debug("Platform: ", viper.GetString("platform_url"))
	log.Debug("Project: ", viper.GetString("project"))

	apiClient = api.NewAPIClient(config)
	projectService = service.NewProjectService(apiClient)

	environmentService = service.NewEnvironmentService(apiClient)
	environmentCmd.Flags().Set("project", viper.GetString("project"))

	taskForceService = service.NewTaskForceService(apiClient)
	taskForceCmd.Flags().Set("project", viper.GetString("project"))

	jobService = service.NewJobService(apiClient)
	applyCmd.Flags().Set("project", viper.GetString("project"))
}
