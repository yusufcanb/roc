package api

import (
	"github.com/gofiber/fiber"
	"github.com/yusufcanb/roc/pkg/repository"
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

func UpdateProject(c *fiber.Ctx) {

}
