package api

import (
	"github.com/gofiber/fiber"
	"github.com/google/uuid"
	"github.com/yusufcanb/roc/pkg/repository"
	"github.com/yusufcanb/roc/pkg/types"
)

func GetProjects(c *fiber.Ctx) {
	projects := repository.GetProjectList()
	c.JSON(projects)
}

func GetProject(c *fiber.Ctx) {
	id := c.Params("id")
	project, err := repository.GetProjectById(id)
	if err != nil {
		c.SendString("ERROR!")
	}
	if project == nil {
		c.SendStatus(fiber.StatusNotFound)
	}

	c.JSON(project)
}

func DeleteProject(c *fiber.Ctx) {
	id := c.Params("id")
	exists := repository.ProjectExists(id)
	if !exists {
		c.SendStatus(fiber.StatusNotFound)
	}

	_, err := repository.DeleteProjectById(id)
	if err != nil {
		c.SendString("ERROR!")
	}

	c.SendStatus(fiber.StatusOK)
}

func CreateProject(c *fiber.Ctx) {
	payload := struct {
		Name      string `json:"name"`
		IsDefault string `json:"isDefault"`
	}{}

	if err := c.BodyParser(&payload); err != nil {
		c.SendStatus(fiber.StatusBadRequest)
	}

	project := types.Project{Id: uuid.New().String(), Name: payload.Name, IsDefault: false}
	ok, _ := repository.SaveProject(project)
	if ok {
		c.JSON(project)
	}

	c.SendStatus(fiber.StatusBadGateway)
}
