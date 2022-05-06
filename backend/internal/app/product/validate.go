package product

import "github.com/matherique/cakesie.app-backend/internal/models"

func validateToInsert(data *models.Product) error {
	switch 0 {
	case len(data.Name):
		return ErrNameRequired
	case data.Quantity:
		return ErrQuantityRequired
	}

	return nil
}
