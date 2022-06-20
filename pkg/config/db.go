package config

import "os"

var REDIS_URL_KEY string = "REDIS_URL"

func GetDBUrl() string {
	url, exists := os.LookupEnv(REDIS_URL_KEY)
	if exists {
		return url
	}
	return "localhost:6379"
}
