package product

import "github.com/matherique/cakesie.app-backend/pkg/errors"

var (
	ErrQuantityRequired = errors.BadRequest("quantity is required")
	ErrNameRequired     = errors.BadRequest("name is required")
)
