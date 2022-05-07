package product

import "github.com/matherique/cakesie.app-backend/internal/models"

func validateToInsert(data *models.Product) error {
	switch 0 {
	case len(data.Name):
		return NameRequiredError
	case data.Quantity:
		return QuantityRequiredError
	}

	return nil
}

func validateToUpdate(data *models.Product) error {
	switch 0 {
	case data.Id:
		return IdRequiredError
	}

	return nil
}
