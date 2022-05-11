package cake

import (
	"strings"

	"github.com/matherique/cakesie.app-backend/internal/models"
	"github.com/matherique/cakesie.app-backend/pkg/errors"
)

func validateToInsert(data *models.Cake) error {
	var msg []string

	if len(data.Name) == 0 {
		msg = append(msg, "name is required")
	}

	if len(data.Description) == 0 {
		msg = append(msg, "description is required")
	}

	if data.Price <= 0 {
		msg = append(msg, "price is required")
	}

	if len(data.CakeIngredients) == 0 {
		msg = append(msg, "ingredients is required")
	}

	if len(msg) == 0 {
		return nil
	}

	text := strings.Join(msg, ", ")

	return errors.NewBadRequest(text)
}
