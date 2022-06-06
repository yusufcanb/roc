package types

import (
	"encoding/json"
)

type Project struct {
	Id        string `json:"id"`
	Name      string `json:"name"`
	IsDefault bool   `json:"isDefault"`
}

func (it *Project) AsJson() string {
	jsonStr, err := json.Marshal(it)
	if err != nil {
		panic("Unable to marshal object")
	}
	return string(jsonStr)
}

func (it *Project) AsMap() map[string]interface{} {
	var projectMap map[string]interface{}
	data, _ := json.Marshal(it)
	json.Unmarshal(data, &projectMap)

	return projectMap
}

func (it *Project) FromJson(jsonStr string) *Project {
	var dat map[string]interface{}
	byt := []byte(jsonStr)
	if err := json.Unmarshal(byt, &dat); err != nil {
		panic(err)
	}

	it.Id = dat["id"].(string)
	it.Name = dat["name"].(string)

	return it
}

func (it *Project) FromMap(projectMap map[string]string) (*Project, error) {
	data, _ := json.Marshal(projectMap)
	err := json.Unmarshal(data, it)

	if err != nil {
		return nil, err
	}

	return it, nil
}
