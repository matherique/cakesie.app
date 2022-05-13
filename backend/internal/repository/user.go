package repository

import (
	"context"

	"github.com/matherique/cakesie.app-backend/internal/models"
)

type UserRepository interface {
	Insert(ctx context.Context, data *models.User) error
}
