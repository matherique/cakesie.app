package repository

import (
	"context"
	"fmt"

	"github.com/matherique/cakesie.app-backend/internal/models"
	"github.com/matherique/cakesie.app-backend/pkg/store"
)

type CakeRepository interface {
	Insert(ctx context.Context, cake *models.Cake) error
	GetAllByStatus(ctx context.Context, status bool) ([]*models.Cake, error)
	UpdateStatus(ctx context.Context, id int, status bool) error
	Update(ctx context.Context, id int, cake *models.Cake) error
	GetById(ctx context.Context, id int) (*models.Cake, error)
}

type cakeRepo struct {
	store store.Store
}

func NewCakeRepository(store store.Store) CakeRepository {
	br := new(cakeRepo)

	br.store = store

	return br
}

func (br *cakeRepo) Insert(ctx context.Context, cake *models.Cake) error {
	dml := `INSERT INTO cake
	(Name, Price, created_at, updated_at) 
	VALUES (name, price, created_at, updated_at) RETURNING *`

	if err := br.store.DB().QueryRowContext(ctx, dml).Scan(&cake); err != nil {
		return fmt.Errorf("could not create new book: %v", err)
	}

	return nil
}

func (br *cakeRepo) GetAllByStatus(ctx context.Context, status bool) ([]*models.Cake, error) {
	return nil, fmt.Errorf("not implemented")
}

func (br *cakeRepo) UpdateStatus(ctx context.Context, id int, status bool) error {
	return fmt.Errorf("not implemented")
}

func (br *cakeRepo) Update(ctx context.Context, id int, cake *models.Cake) error {
	return fmt.Errorf("not implemented")
}

func (br *cakeRepo) GetById(ctx context.Context, id int) (*models.Cake, error) {
	return nil, fmt.Errorf("not implemented")
}
