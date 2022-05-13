package user

import (
	"fmt"
	"strings"

	"github.com/matherique/cakesie.app-backend/internal/models"
)

func validateToInsert(data *models.User) error {
	var msg []string

	switch true {
	case len(data.Name) == 0:
		msg = append(msg, "name is required")
	case len(data.Phone) == 0:
		msg = append(msg, "phone is required")
	case len(data.Email) == 0:
		msg = append(msg, "email is required")
	case len(data.Password) == 0:
		msg = append(msg, "password is required")
	}

	if len(msg) == 0 {
		return nil
	}

	return fmt.Errorf(strings.Join(msg, ", "))
}
