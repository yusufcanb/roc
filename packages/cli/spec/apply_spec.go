package spec

import (
	"fmt"
	"log"

	"github.com/yusufcanb/roc-cli/api"
	"github.com/yusufcanb/roc-cli/utils"
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
	switch obj.Kind {
	case "Project":
		var p api.Project
		err := utils.MapToStruct(obj.Spec, &p)
		if err != nil {
			log.Fatalf("Error casting spec to ProjectSpec")
		}
	default:
		log.Fatalf("Unrecognized kind: %s", obj.Kind)
	}
	return &obj, nil
}
