package repository

import (
	"context"
	"testing"

	"github.com/matherique/cakesie.app-backend/internal/constants"
	"github.com/matherique/cakesie.app-backend/internal/models"
	"github.com/matherique/cakesie.app-backend/pkg/store"
)

const conString = "postgres://postgres:123@localhost:5432/cakesie?sslmode=disable"

func TestProductRepository_Insert(t *testing.T) {
	store := store.NewStore(conString).WithDrive("postgres")
	defer store.Close()

	if err := store.Connect(); err != nil {
		t.Fatal(err)
	}

	repo := NewProductRepository(store)

	product := &models.Product{Name: "any_name", Unity: constants.Unidade}
	if err := repo.Insert(context.Background(), product); err != nil {
		t.Errorf("expected nil, got %v", err)
	}

	if product.Id == 0 {
		t.Errorf("expected id to be greater than 0, got %d", product.Id)
	}
}
