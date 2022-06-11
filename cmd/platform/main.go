package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/yusufcanb/roc/pkg/api"
)

func main() {
	app := fiber.New(fiber.Config{
		AppName: "ROC Platform",
	})

	//  Project handlers
	app.Get("/projects", api.GetProjects)
	app.Post("/projects", api.CreateProject)
	app.Get("/projects/:id", api.GetProject)
	app.Delete("/projects/:id", api.DeleteProject)

	// Agent handlers
	app.Get("/agents", api.GetAgents)
	app.Post("/agents", api.CreateAgent)

	app.Listen(":8000")

}
