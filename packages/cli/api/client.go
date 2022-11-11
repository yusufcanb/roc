package api

import (
	"github.com/go-resty/resty/v2"
)

var client *resty.Client

func init() {
	client = resty.New()
}
