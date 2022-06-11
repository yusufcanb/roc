package api

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gosimple/slug"
	"github.com/yusufcanb/roc/pkg/repository"
	"github.com/yusufcanb/roc/pkg/types"
)

func GetProjects(c *fiber.Ctx) error {
	projects := repository.GetProjectList()
	return c.JSON(projects)
}

func GetProject(c *fiber.Ctx) error {
	id := c.Params("id")
	exists := repository.ProjectExists(id)
	if !exists {
		return c.SendStatus(fiber.StatusNotFound)
	}

	project, err := repository.GetProjectById(id)
	if err != nil {
		return c.SendString("ERROR!")
	}
	if project == nil {
		return c.SendStatus(fiber.StatusNotFound)
	}

	return c.JSON(project)
}

func DeleteProject(c *fiber.Ctx) error {
	id := c.Params("id")
	exists := repository.ProjectExists(id)
	if !exists {
		c.SendStatus(fiber.StatusNotFound)
	}

	_, err := repository.DeleteProjectById(id)
	if err != nil {
		return c.SendString("ERROR!")
	}

	return c.SendStatus(fiber.StatusOK)
}

func CreateProject(c *fiber.Ctx) error {
	payload := struct {
		Name      string `json:"name"`
		IsDefault string `json:"isDefault"`
	}{}

	if err := c.BodyParser(&payload); err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	exists := repository.CheckKeyExists(repository.GetProjectKey(slug.Make(payload.Name)))
	if exists {
		return c.Status(400).JSON(map[string]string{"detail": "Project already exits."})
	}

	project := types.Project{Name: payload.Name, IsDefault: false}
	err := repository.SaveProject(&project)
	if err != nil {
		return c.SendStatus(fiber.StatusBadGateway)
	}
	return c.JSON(project)
}
