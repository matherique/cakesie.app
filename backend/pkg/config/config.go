package config

import (
	"fmt"
	"os"
)

type config struct {
	APP_PORT          string
	RPC_PORT          string
	CONNECTION_STRING string
}

func Read() (*config, error) {
	c := new(config)
	c.APP_PORT = fmt.Sprintf(":%s", os.Getenv("APP_PORT"))
	c.RPC_PORT = fmt.Sprintf(":%s", os.Getenv("RPC_PORT"))
	c.CONNECTION_STRING = os.Getenv("CONNECTION_STRING")

	if err := c.validate(); err != nil {
		return nil, err
	}

	return c, nil
}

func (c *config) validate() error {
	switch true {
	case c.APP_PORT == "":
		return fmt.Errorf("missing APP_PORT env variable")
	case c.RPC_PORT == "":
		return fmt.Errorf("missing RPC_PORT env variable")
	case c.CONNECTION_STRING == "":
		return fmt.Errorf("missing CONNECTION_STRING env variable")
	}

	return nil
}
