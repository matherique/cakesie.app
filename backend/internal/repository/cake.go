package repository

import (
	"context"
	"fmt"
	"time"

	"github.com/matherique/cakesie.app-backend/internal/models"
	"github.com/matherique/cakesie.app-backend/pkg/store"
)

type CakeRepository interface {
	Insert(ctx context.Context, cake *models.Cake) error
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
	cake.CreatedAt = time.Now()
	cake.UpdatedAt = time.Now()

	dml := `INSERT INTO cake
	(name, price, created_at, updated_at) 
	VALUES (name, price, created_at, updated_at) RETURNING *`

	if err := br.store.DB().QueryRowContext(ctx, dml).Scan(&cake); err != nil {
		return fmt.Errorf("could not create new book: %v", err)
	}

	return nil
}
