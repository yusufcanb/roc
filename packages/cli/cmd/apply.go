package cmd

import (
	"io/ioutil"

	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
	"github.com/yusufcanb/roc-cli/spec"
)

// Get the file path from the -f flag
func getFilePathFromFlag(cmd *cobra.Command) string {
	filePath, err := cmd.Flags().GetString("file")
	if err != nil {
		log.Fatalf("Error getting file flag: %s", err)
	}
	return filePath
}

func readYAMLFile(filePath string) []byte {
	data, err := ioutil.ReadFile(filePath)
	if err != nil {
		log.Fatalf("Error reading YAML file: %s", err)
	}
	return data
}

func mapYAMLFileToApplySpec(data []byte) []spec.CLIApplySpec {
	var applySpec *[]spec.CLIApplySpec
	var err error
	if applySpec, err = spec.UnmarshalCLISpec(data); err != nil {
		log.Fatalf("Error unmarshalling YAML data: %s", err)
	}
	return *applySpec
}

// applyCmd represents the apply command
var applyCmd = &cobra.Command{
	Use:   "apply",
	Short: "Apply a configuration file",
	Run: func(cmd *cobra.Command, args []string) {

		log.Println(viper.ConfigFileUsed())

		// Get the file path from the -f flag
		filePath := getFilePathFromFlag(cmd)

		// Read the YAML file
		data := readYAMLFile(filePath)

		// Unmarshal the YAML data into a slice of documents
		documents := mapYAMLFileToApplySpec(data)

		for _, doc := range documents {
			// Map spec with dedicated kind
			switch doc.Kind {
			case "Project":
				projectService.ApplyCLISpec(&doc)
			case "Environment":
				projectId := getProjectFromFlag(cmd)
				environmentService.ApplyCLISpec(projectId, &doc)
			case "TaskForce":
				projectId := getProjectFromFlag(cmd)
				taskForceService.ApplyCLISpec(projectId, &doc)
			case "Job":
				projectId := getProjectFromFlag(cmd)
				jobService.ApplyCLISpec(projectId, &doc)
			default:
				log.Fatalf("Unrecognized kind: %s", doc.Kind)
			}
		}
	},
}

func init() {
	applyCmd.Flags().StringP("file", "f", "", "YAML file to apply")
	applyCmd.Flags().StringP("project", "p", "", "Project identifier")

	rootCmd.AddCommand(applyCmd)
}
