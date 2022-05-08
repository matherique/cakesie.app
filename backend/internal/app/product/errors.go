package product

import "github.com/matherique/cakesie.app-backend/pkg/errors"

var (
	UnityRequiredError = errors.NewBadRequest("unity is required")
	NameRequiredError  = errors.NewBadRequest("name is required")
	IdRequiredError    = errors.NewBadRequest("id is required")

	DefaultRepositoryError = errors.NewInternalServerError("oops something went wrong")
)
