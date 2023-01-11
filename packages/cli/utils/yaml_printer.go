package utils

import (
	"fmt"
	"log"

	"gopkg.in/yaml.v3"
)

func PrintAsYAML(value interface{}) {
	// Marshal the value to YAML
	yamlData, err := yaml.Marshal(value)
	if err != nil {
		log.Fatalf("Error marshalling to YAML: %s", err)
	}
	// Print the YAML data to the console
	fmt.Println(string(yamlData))
}
