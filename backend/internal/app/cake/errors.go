package cake

import "github.com/matherique/cakesie.app-backend/pkg/errors"

var (
	NameRequiredError         = errors.NewBadRequest("name is required")
	DescriptionRequiredError  = errors.NewBadRequest("description is required")
	PriceRequiredError        = errors.NewBadRequest("price is required")
	IngredientesRequiredError = errors.NewBadRequest("ingredients is required")
	IdRequiredError           = errors.NewBadRequest("id is required")

	DefaultRepositoryError = errors.NewInternalServerError("oops something went wrong")
)
