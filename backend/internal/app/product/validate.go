package product

import "github.com/matherique/cakesie.app-backend/internal/models"

func validateToInsert(data *models.Product) error {
	switch 0 {
	case len(data.Name):
		return NameRequiredError
	case len(data.Unity):
		return UnityRequiredError
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
