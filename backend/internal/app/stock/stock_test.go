package stock

import (
	"context"
	"fmt"
	"testing"

	"github.com/google/go-cmp/cmp"
	"github.com/matherique/cakesie.app-backend/internal/constants"
	"github.com/matherique/cakesie.app-backend/internal/models"
)

var products = []*models.Product{
	{
		Id:    1,
		Name:  "test",
		Unity: constants.Litro,
	},
	{
		Id:    2,
		Name:  "test-2",
		Unity: constants.Kilo,
	},
}

type stockRepoInMemory struct {
	stock []*models.Stock
}

func (s *stockRepoInMemory) Insert(ctx context.Context, data *models.Stock) (*models.Stock, error) {
	data.Id = len(s.stock) + 1

	var product *models.Product
	for _, p := range products {
		if p.Id == data.ProductId {
			product = p
			break
		}
	}

	if product == nil {
		return nil, fmt.Errorf("not found")
	}

	data.Product = product
	s.stock = append(s.stock, data)

	return data, nil
}

func (s *stockRepoInMemory) FindByProductId(ctx context.Context, productId int) (*models.StockStatistics, error) {
	var quantity int

	var product *models.Product

	for _, stock := range s.stock {
		if stock.ProductId == productId {
			quantity += stock.Quantity
			product = stock.Product
		}
	}

	var statistics models.StockStatistics
	statistics.Quantity = quantity
	statistics.Product = product

	return &statistics, nil
}

func TestStock_Add(t *testing.T) {
	repo := new(stockRepoInMemory)
	s := NewStockApp(repo)

	productId := 1
	quantity := 1

	got, err := s.Add(context.Background(), productId, quantity)

	if err != nil {
		t.Fatalf("expected error nil, got %v", err)
	}

	if got.Id == 0 {
		t.Fatalf("expected id != 0, got %v", got.Id)
	}

	want := &models.Stock{
		Id:        got.Id,
		ProductId: productId,
		Quantity:  quantity,
		AddedAt:   got.AddedAt,
		Product:   products[0],
	}

	if diff := cmp.Diff(got, want); diff != "" {
		t.Errorf("unexpected diff: %v", diff)
	}
}

func TestStock_GetStatistics(t *testing.T) {
	repo := new(stockRepoInMemory)
	s := NewStockApp(repo)

	productId := 1

	for _, quantity := range []int{1, 2, 3, -2} {
		if _, err := s.Add(context.Background(), productId, quantity); err != nil {
			t.Fatalf("expected error nil, got %v", err)
		}
	}

	got, err := s.GetStatisticsByProductId(context.Background(), productId)

	if err != nil {
		t.Fatalf("expected error nil, got %v", err)
	}

	if got.Quantity != 4 {
		t.Fatalf("expected quantity != 6, got %v", got.Quantity)
	}
}

func TestStock_GetAllStatics(t *testing.T) {
	repo := new(stockRepoInMemory)
	s := NewStockApp(repo)

	productIds := []int{1, 2, 1, 2}

	for i, quantity := range []int{1, 2, 3, 7} {
		if _, err := s.Add(context.Background(), productIds[i], quantity); err != nil {
			t.Fatalf("expected error nil, got %v", err)
		}
	}

	got, err := s.GetAllStatics(context.Background())

	if err != nil {
		t.Fatalf("expected error nil, got %v", err)
	}

	if len(got) != 2 {
		t.Fatalf("expected len(got) != 2, got %v", len(got))
	}

}
