package repository

import (
	"context"
	"testing"

	"github.com/matherique/cakesie.app-backend/internal/constants"
	"github.com/matherique/cakesie.app-backend/internal/models"
	"github.com/matherique/cakesie.app-backend/pkg/store"
)

const conString = "postgres://postgres:123@localhost:5432/cakesie?sslmode=disable"

func clearAll(t *testing.T, store store.Store) {
	if _, err := store.DB().Exec("DELETE FROM product"); err != nil {
		t.Fatalf("failed to delete all records in product table: %v", err)
	}
}

func MakeProductRepository(t *testing.T) (ProductRepository, store.Store) {
	store := store.NewStore(conString).WithDrive("postgres")

	if err := store.Connect(); err != nil {
		t.Fatal(err)
	}

	return NewProductRepository(store), store
}

func TestProductRepository_Insert(t *testing.T) {
	repo, con := MakeProductRepository(t)

	defer func(t *testing.T) {
		clearAll(t, con)
		con.Close()
	}(t)

	product := &models.Product{Name: "any_name", Unity: constants.Unidade}
	if err := repo.Insert(context.Background(), product); err != nil {
		t.Errorf("expected nil, got %v", err)
	}

	if product.Id == 0 {
		t.Errorf("expected id to be greater than 0, got %d", product.Id)
	}
}

func TestProductRepository_Update(t *testing.T) {
	repo, con := MakeProductRepository(t)

	defer func(t *testing.T) {
		clearAll(t, con)
		con.Close()
	}(t)

	product := &models.Product{Name: "any_name", Unity: constants.Unidade}
	if err := repo.Insert(context.Background(), product); err != nil {
		t.Errorf("expected nil, got %v", err)
	}

	if product.Id == 0 {
		t.Errorf("expected id to be greater than 0, got %d", product.Id)
	}

	newData := &models.Product{Name: "any_name_2", Unity: constants.Unidade}
	if err := repo.Update(context.Background(), product.Id, newData); err != nil {
		t.Errorf("expected nil, got %v", err)
	}

	if newData.Name == product.Name {
		t.Errorf("expected name to be %s, got %s", newData.Name, product.Name)
	}
}
