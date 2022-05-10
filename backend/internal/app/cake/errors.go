package cake

import "github.com/matherique/cakesie.app-backend/pkg/errors"

var (
	IdRequiredError = errors.NewBadRequest("id is required")

	DefaultRepositoryError = errors.NewInternalServerError("oops something went wrong")
)
