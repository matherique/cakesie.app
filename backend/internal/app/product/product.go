package product

import (
	"context"

	"github.com/matherique/cakesie.app-backend/internal/models"
	"github.com/matherique/cakesie.app-backend/internal/repository"
)

type Product interface {
	Create(ctx context.Context, data *models.Product) (*models.Product, error)
	Update(ctx context.Context, data *models.Product) (*models.Product, error)
}

type product struct {
	repo repository.ProductRepository
}

func NewProductApp(repo repository.ProductRepository) Product {
	return &product{
		repo: repo,
	}
}

func (p *product) Create(ctx context.Context, data *models.Product) (*models.Product, error) {
	if err := validateToInsert(data); err != nil {
		return nil, err
	}

	if err := p.repo.Insert(ctx, data); err != nil {
		return nil, err
	}

	return data, nil
}

func (p *product) Update(ctx context.Context, data *models.Product) (*models.Product, error) {
	if err := validateToUpdate(data); err != nil {
		return nil, err
	}

	if err := p.repo.Update(ctx, data.Id, data); err != nil {
		return nil, err
	}

	return data, nil
}
