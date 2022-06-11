package api

import (
	"github.com/gofiber/fiber"
	"github.com/yusufcanb/roc/pkg/repository"
	"github.com/yusufcanb/roc/pkg/types"
)

func GetAgents(c *fiber.Ctx) {
	agents := repository.GetAgents()
	c.JSON(agents)
}

func CreateAgent(c *fiber.Ctx) {
	payload := types.Agent{}

	if err := c.BodyParser(&payload); err != nil {
		c.SendStatus(fiber.StatusBadRequest)
	}

	err := repository.SaveAgent(&payload)
	if err != nil {
		c.SendStatus(fiber.StatusBadGateway)
	}

	c.SendStatus(fiber.StatusCreated)
}
