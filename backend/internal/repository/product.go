package repository

import (
	"context"
	"fmt"

	"github.com/matherique/cakesie.app-backend/internal/models"
	"github.com/matherique/cakesie.app-backend/pkg/store"
)

type ProductRepository interface {
	Insert(ctx context.Context, product *models.Product) error
	Update(ctx context.Context, id int, product *models.Product) error
	GetById(ctx context.Context, id int) (*models.Product, error)
}

type productRepository struct {
	store store.Store
}

func NewProductRepository(store store.Store) ProductRepository {
	r := new(productRepository)
	r.store = store

	return r
}

func (repo *productRepository) Insert(ctx context.Context, product *models.Product) error {
	dml := `INSERT INTO product
	(Name, Quantity) 
	VALUES ($1, $2) RETURNING *`

	db := repo.store.DB()
	query := db.QueryRowContext(ctx, dml, product.Name, product.Quantity)

	if err := query.Scan(&product.Id, &product.Name, &product.Quantity); err != nil {
		return fmt.Errorf("could not create new book: %v", err)
	}

	return nil
}

func (repo *productRepository) Update(ctx context.Context, id int, product *models.Product) error {
	return fmt.Errorf("not implemented")
}

func (repo *productRepository) GetById(ctx context.Context, id int) (*models.Product, error) {
	return nil, fmt.Errorf("not implemented")
}
