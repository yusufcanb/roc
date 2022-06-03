package main

import (
	"net/http"
)

func main() {

	http.HandleFunc("/hello", hello)
	http.HandleFunc("/headers", headers)

	err := http.ListenAndServe(":8000", nil)
	if err != nil {
		return
	}
}
