package repository

import "github.com/matherique/cakesie.app-backend/pkg/errors"

var (
	DefaultRepositoryError = errors.NewInternalServerError("oops something went wrong")
)
