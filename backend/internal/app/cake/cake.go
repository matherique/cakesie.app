package cake

import (
	"context"

	"github.com/matherique/cakesie.app-backend/internal/models"
	"github.com/matherique/cakesie.app-backend/internal/repository"
)

type Cake interface {
	New(ctx context.Context, name string, price float64) (*models.Cake, error)
}

type cake struct {
	repo repository.CakeRepository
}

func NewCakeApp(repo repository.CakeRepository) Cake {
	return &cake{
		repo: repo,
	}
}

func (c *cake) New(ctx context.Context, name string, price float64) (*models.Cake, error) {
	cake := &models.Cake{
		Name:  name,
		Price: price,
	}

	err := c.repo.Insert(ctx, cake)

	if err != nil {
		return nil, err
	}

	return cake, nil
}
