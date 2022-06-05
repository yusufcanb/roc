package types

import "encoding/json"

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

func (it *Project) FromJson(jsonStr string) *Project {
	var dat map[string]interface{}
	byt := []byte(jsonStr)
	if err := json.Unmarshal(byt, &dat); err != nil {
		panic(err)
	}

	it.Id = dat["id"].(string)
	it.Name = dat["name"].(string)
	it.IsDefault = dat["isDefault"].(bool)

	return it
}
