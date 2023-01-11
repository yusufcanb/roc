package spec

import (
	"fmt"

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

func UnmarshalCLISpec(data []byte) (*CLIApplySpec, error) {
	var obj CLIApplySpec
	if err := yaml.Unmarshal(data, &obj); err != nil {
		return nil, fmt.Errorf("error unmarshalling yaml data: %s", err)
	}
	return &obj, nil
}
