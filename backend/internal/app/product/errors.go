package product

import "github.com/matherique/cakesie.app-backend/pkg/errors"

var (
	ErrQuantityRequired = errors.NewBadRequest("quantity is required")
	ErrNameRequired     = errors.NewBadRequest("name is required")
	ErrIdRequired       = errors.NewBadRequest("id is required")
)
