package user

import (
	"context"
	"fmt"

	"github.com/matherique/cakesie.app-backend/internal/models"
	"github.com/matherique/cakesie.app-backend/internal/repository"
	"github.com/matherique/cakesie.app-backend/pkg/cryptography"
	"github.com/matherique/cakesie.app-backend/pkg/errors"
)

type Creater interface {
	Create(ctx context.Context, data *models.User) (*models.User, error)
	Login(ctx context.Context, email, password string) (*TokenData, error)
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
	Getter
}

type user struct {
	repo   repository.UserRepository
	hasher cryptography.Hasher
	token  cryptography.Tokener
}

func NewUserApp(repo repository.UserRepository, hasher cryptography.Hasher, token cryptography.Tokener) User {
	return &user{
		repo:   repo,
		hasher: hasher,
		token:  token,
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

func (u *user) GetById(ctx context.Context, id int) (*models.User, error) {
	if id == 0 {
		return nil, errors.NewBadRequest("id must be greater than 0")
	}

	user, err := u.repo.GetById(ctx, id)

	if err != nil {
		return nil, repository.DefaultRepositoryError
	}

	if user == nil {
		return nil, errors.NewNotFound(fmt.Sprintf("user with id %d not found", id))
	}

	return user, nil
}

func (u *user) GetAll(ctx context.Context) ([]*models.User, error) {
	users, err := u.repo.GetAll(ctx)

	if err != nil {
		return nil, repository.DefaultRepositoryError
	}

	return users, nil
}

func (u *user) Login(ctx context.Context, email, password string) (*TokenData, error) {
	user, err := u.repo.FindByEmail(ctx, email)

	if err != nil {
		return nil, errors.NewBadRequest("invalid email or password")
	}

	if !u.hasher.Validate([]byte(password), []byte(user.Password)) {
		return nil, errors.NewBadRequest("invalid email or password")
	}

	token, err := u.token.Generate(user.Id, user.Email)

	if err != nil {
		return nil, err
	}

	return &TokenData{
		Id:    user.Id,
		Token: string(token),
		Name:  user.Name,
	}, nil
}
