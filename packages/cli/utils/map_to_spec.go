package utils

import "encoding/json"

func MapToStruct(data map[string]interface{}, result interface{}) error {
	jsonData, err := json.Marshal(data)
	if err != nil {
		return err
	}

	if err := json.Unmarshal(jsonData, result); err != nil {
		return err
	}
	return nil
}
