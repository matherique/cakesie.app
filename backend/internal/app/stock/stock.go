package stock

import (
	"context"
	"time"

	"github.com/matherique/cakesie.app-backend/internal/models"
	"github.com/matherique/cakesie.app-backend/internal/repository"
)

type Stock interface {
	Add(ctx context.Context, productId int, quantity int) (*models.Stock, error)
	GetStatisticsByProductId(ctx context.Context, productId int) (*models.StockStatistics, error)
	GetAllStatics(ctx context.Context) ([]*models.StockStatistics, error)
}

type stock struct {
	repo repository.StockRepository
}

func NewStockApp(repo repository.StockRepository) Stock {
	return &stock{
		repo: repo,
	}
}

func (s *stock) Add(ctx context.Context, productId int, quantity int) (*models.Stock, error) {
	data := &models.Stock{
		ProductId: productId,
		Quantity:  quantity,
		AddedAt:   time.Now(),
	}

	result, err := s.repo.Insert(ctx, data)

	if err != nil {
		return nil, DefaultRepositoryError
	}

	return result, nil
}

func (s *stock) GetStatisticsByProductId(ctx context.Context, productId int) (*models.StockStatistics, error) {
	statistics, err := s.repo.FindByProductId(ctx, productId)

	if err != nil {
		return nil, DefaultRepositoryError
	}

	return statistics, nil
}

func (s *stock) GetAllStatics(ctx context.Context) ([]*models.StockStatistics, error) {
	return nil, nil
}
