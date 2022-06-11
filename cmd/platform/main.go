package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/yusufcanb/roc/pkg/api"
)

func return502NotImplemented(c *fiber.Ctx) error {
	return c.SendStatus(502)
}

func main() {
	app := fiber.New(fiber.Config{
		AppName: "ROC Platform",
		Prefork: false,
	})

	//  Project handlers
	app.Get("/project", api.GetProjects)
	app.Post("/project", api.CreateProject)
	app.Get("/project/:id", api.GetProject)
	app.Delete("/project/:id", api.DeleteProject)

	// Agent handlers
	app.Get("/agent", api.GetAgents)
	app.Post("/agent", api.CreateAgent)
	app.Get("/agent/:id", return502NotImplemented)
	app.Patch("/agent/:id", return502NotImplemented)
	app.Delete("/agent/:id", return502NotImplemented)

	// Environment handlers
	app.Get("/environment", return502NotImplemented)
	app.Post("/environment", return502NotImplemented)
	app.Get("/environment/:id", return502NotImplemented)
	app.Patch("/environment/:id", return502NotImplemented)
	app.Delete("/environment/:id", return502NotImplemented)

	// Task Force handlers
	app.Get("/task-force", return502NotImplemented)
	app.Post("/task-force", return502NotImplemented)
	app.Get("/task-force/:id", return502NotImplemented)
	app.Patch("/task-force/:id", return502NotImplemented)
	app.Delete("/task-force/:id", return502NotImplemented)

	// Job handlers
	app.Get("/job", return502NotImplemented)
	app.Post("/job", return502NotImplemented)
	app.Get("/job/:id", return502NotImplemented)
	app.Patch("/job/:id", return502NotImplemented)
	app.Delete("/job/:id", return502NotImplemented)

	app.Listen(":8000")

}
