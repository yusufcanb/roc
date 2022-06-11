package api

import (
	"github.com/gofiber/fiber/v2"
	"github.com/yusufcanb/roc/pkg/repository"
	"github.com/yusufcanb/roc/pkg/types"
)

func GetAgents(c *fiber.Ctx) error {
	agents := repository.GetAgents()
	return c.JSON(agents)
}

func CreateAgent(c *fiber.Ctx) error {
	payload := types.Agent{}

	if err := c.BodyParser(&payload); err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	err := repository.SaveAgent(&payload)
	if err != nil {
		return c.SendStatus(fiber.StatusBadGateway)
	}

	return c.SendStatus(fiber.StatusCreated)
}
