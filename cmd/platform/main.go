package main

import (
	"github.com/gofiber/fiber"
	"github.com/yusufcanb/roc/pkg/api"
)

func main() {
	app := fiber.New()

	app.Get("/projects", api.GetProjects)
	app.Get("/projects/:id", api.GetProject)
	app.Delete("/projects/:id", api.DeleteProject)

	app.Listen(":8000")

}
