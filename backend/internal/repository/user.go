package repository

import (
	"context"

	"github.com/matherique/cakesie.app-backend/internal/models"
)

type UserRepository interface {
	Insert(ctx context.Context, data *models.User) error
	GetById(ctx context.Context, id int) (*models.User, error)
	GetAll(ctx context.Context) ([]*models.User, error)
	FindByEmail(ctx context.Context, email string) (*models.User, error)
	Update(ctx context.Context, id int, data *models.User) (*models.User, error)
}