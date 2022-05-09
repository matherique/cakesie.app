package cake

import "github.com/matherique/cakesie.app-backend/internal/models"

func validateToInsert(data *models.Cake) error {
	switch true {
	case len(data.Name) == 0:
		return NameRequiredError
	case len(data.Description) == 0:
		return DescriptionRequiredError
	case data.Price <= 0:
		return PriceRequiredError
	case len(data.Ingredientes) == 0:
		return IngredientesRequiredError
	}

	return nil
}
