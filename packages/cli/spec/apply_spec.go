package spec

import (
	"log"
	"strings"

	"gopkg.in/yaml.v3"
)

type CLIApplySpec struct {
	// The API version of the object
	APIVersion string `yaml:"apiVersion"`
	// The kind of the object
	Kind string `yaml:"kind"`
	// The specification for the object
	Spec map[string]interface{} `yaml:"spec,omitempty"`
}

func UnmarshalCLISpec(data []byte) (*[]CLIApplySpec, error) {
	var allDocs []CLIApplySpec

	parts := strings.Split(string(data), "---")

	for _, part := range parts {
		var doc CLIApplySpec
		err := yaml.Unmarshal([]byte(part), &doc)
		if err != nil {
			log.Fatalf("error: %v", err)
			return nil, err
		}
		allDocs = append(allDocs, doc)
	}
	return &allDocs, nil
}
