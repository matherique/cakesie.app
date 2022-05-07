package product

import (
	"context"

	"github.com/matherique/cakesie.app-backend/internal/models"
	"github.com/matherique/cakesie.app-backend/internal/repository"
)

type Product interface {
	Create(ctx context.Context, data *models.Product) (*models.Product, error)
	Update(ctx context.Context, data *models.Product) (*models.Product, error)
	Get(ctx context.Context, id int) (*models.Product, error)
	GetAll(ctx context.Context) ([]models.Product, error)
	Search(ctx context.Context, name string) ([]models.Product, error)
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

func (p *product) Get(ctx context.Context, id int) (*models.Product, error) {
	if id == 0 {
		return nil, IdRequiredError
	}

	return p.repo.GetById(ctx, id)
}

func (p *product) GetAll(ctx context.Context) ([]models.Product, error) {
	products, err := p.repo.GetAll(ctx)

	if err != nil {
		return []models.Product{}, err
	}

	return products, nil
}

func (p *product) Search(ctx context.Context, name string) ([]models.Product, error) {
	products, err := p.repo.Search(ctx, name)

	if err != nil {
		return []models.Product{}, err
	}

	return products, nil
}
