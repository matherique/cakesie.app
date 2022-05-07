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
	GetAll(ctx context.Context) ([]models.Product, error)
	Search(ctx context.Context, name string) ([]models.Product, error)
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
	dml := `INSERT INTO product (Name, Unity) VALUES ($1, $2) RETURNING *`

	db := repo.store.DB()
	query := db.QueryRowContext(ctx, dml, product.Name, product.Unity)

	if err := query.Scan(&product.Id, &product.Name, &product.Unity); err != nil {
		return fmt.Errorf("could not insert a new product: %v", err)
	}

	return nil
}

func (repo *productRepository) Update(ctx context.Context, id int, product *models.Product) error {
	dml := `UPDATE product SET Name = $1, Unity = $2 WHERE Id = $3 RETURNING *`

	db := repo.store.DB()

	query := db.QueryRowContext(ctx, dml, product.Name, product.Unity, id)

	if err := query.Scan(&product.Id, &product.Name, &product.Unity); err != nil {
		return fmt.Errorf("could not update a product: %v", err)
	}

	return nil
}

func (repo *productRepository) GetById(ctx context.Context, id int) (*models.Product, error) {
	dml := `SELECT Id, Name, Unity FROM product WHERE Id = $1`

	db := repo.store.DB()

	query := db.QueryRowContext(ctx, dml, id)

	var product models.Product
	if err := query.Scan(&product.Id, &product.Name, &product.Unity); err != nil {
		return nil, fmt.Errorf("could not get the product: %v", err)
	}

	return &product, nil
}

func (repo *productRepository) GetAll(ctx context.Context) ([]models.Product, error) {
	return []models.Product{}, fmt.Errorf("not implemented")
}

func (repo *productRepository) Search(ctx context.Context, name string) ([]models.Product, error) {
	return []models.Product{}, fmt.Errorf("not implemented")
}
