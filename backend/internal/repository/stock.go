package repository

import (
	"context"

	"github.com/matherique/cakesie.app-backend/internal/models"
)

type StockRepository interface {
	Insert(ctx context.Context, data *models.Stock) (*models.Stock, error)
	FindByProductId(ctx context.Context, productId int) (*models.StockStatistics, error)
}
