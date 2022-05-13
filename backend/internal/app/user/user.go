package user

import (
	"context"

	"github.com/matherique/cakesie.app-backend/internal/models"
	"github.com/matherique/cakesie.app-backend/internal/repository"
	"github.com/matherique/cakesie.app-backend/pkg/cryptography"
)

type Creater interface {
	Create(ctx context.Context, data *models.User) (*models.User, error)
}

type Getter interface {
	GetById(ctx context.Context, id int) (*models.User, error)
	GetAll(ctx context.Context) ([]*models.User, error)
}

type Updater interface {
	Update(ctx context.Context, id int, data *models.User) (*models.User, error)
	ChageRole(ctx context.Context, id int, role string) error
}

type User interface {
	Creater
}

type user struct {
	repo   repository.UserRepository
	hasher cryptography.Hasher
}

func NewUserApp(repo repository.UserRepository, hasher cryptography.Hasher) User {
	return &user{
		repo:   repo,
		hasher: hasher,
	}
}

func (u *user) Create(ctx context.Context, data *models.User) (*models.User, error) {
	if err := validateToInsert(data); err != nil {
		return nil, err
	}

	hashed, err := u.hasher.Hash([]byte(data.Password))
	if err != nil {
		return nil, err
	}

	data.Password = string(hashed)

	if err := u.repo.Insert(ctx, data); err != nil {
		return nil, repository.DefaultRepositoryError
	}

	return data, nil
}
