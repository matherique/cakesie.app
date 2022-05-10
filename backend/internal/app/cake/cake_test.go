package cake

import (
	"context"
	"fmt"
	"testing"

	"github.com/matherique/cakesie.app-backend/internal/models"
)

type cakeRepoInMemory struct {
	cake []*models.Cake
}

func NewCakeRepositoryInMemory() *cakeRepoInMemory {
	return &cakeRepoInMemory{
		cake: []*models.Cake{},
	}
}

func (s *cakeRepoInMemory) Insert(ctx context.Context, cake *models.Cake) error {
	cake.Id = len(s.cake) + 1
	s.cake = append(s.cake, cake)

	cake.Ingredientes = []models.Ingredients{
		{
			CakeId:    cake.Id,
			ProductId: cake.CakeIngredients[0].ProductId,
			Quantity:  cake.CakeIngredients[0].Quantity,
		},
	}

	return nil
}

func (s *cakeRepoInMemory) GetAllByStatus(ctx context.Context, status bool) ([]*models.Cake, error) {
	var cakes []*models.Cake
	for _, cake := range s.cake {
		if cake.Status == status {
			cakes = append(cakes, cake)
		}
	}

	if len(cakes) == 0 {
		return nil, fmt.Errorf("not found")
	}

	return cakes, nil
}

func (s *cakeRepoInMemory) UpdateStatus(ctx context.Context, id int, status bool) error {
	var cake *models.Cake

	for _, c := range s.cake {
		if c.Id == id {
			cake = c
			break
		}
	}

	if cake == nil {
		return fmt.Errorf("not found")
	}

	cake.Status = status

	return nil
}

func (s *cakeRepoInMemory) Update(ctx context.Context, id int, data *models.Cake) error {
	var cake *models.Cake

	for _, c := range s.cake {
		if c.Id == id {
			cake = c
			break
		}
	}

	if cake == nil {
		return fmt.Errorf("not found")
	}

	*cake = *data

	return nil
}

func (s *cakeRepoInMemory) GetById(ctx context.Context, id int) (*models.Cake, error) {
	for _, c := range s.cake {
		if c.Id == id {
			return c, nil
		}
	}

	return nil, fmt.Errorf("not found")
}

func TestCake_Create(t *testing.T) {
	repo := new(cakeRepoInMemory)
	app := NewCakeApp(repo)

	data := new(models.Cake)

	_, err := app.Create(context.Background(), data)

	if err == nil {
		t.Fatalf("expected %v, got nil", err)
	}

	data.Name = "test"
	data.Description = "test"
	data.Price = 1.0
	data.CakeIngredients = []models.CakeIngredients{{ProductId: 1, Quantity: 1}}

	p, err := app.Create(context.Background(), data)

	if err != nil {
		t.Fatalf("expected nil, got %v", err)
	}

	if p.Id == 0 {
		t.Errorf("expected id > 0, got %v", p.Id)
	}

	if p.Status != true {
		t.Errorf("expected status true, got %v", p.Status)
	}

	if len(p.Ingredientes) != 1 {
		t.Errorf("expected len(ingredientes) == 1, got %v", len(p.Ingredientes))
	}

	if p.Ingredientes[0].ProductId != data.CakeIngredients[0].ProductId {
		t.Errorf("expected ingrediente.ProductId == 1, got %v", p.Ingredientes[0].ProductId)
	}

	if p.Ingredientes[0].Quantity != data.CakeIngredients[0].Quantity {
		t.Errorf("expected ingrediente.Quantity == 1, got %v", p.Ingredientes[0].Quantity)
	}
}

func TestCake_GetAllByStatus(t *testing.T) {
	repo := new(cakeRepoInMemory)
	app := NewCakeApp(repo)

	data := &models.Cake{
		Name:            "test",
		Description:     "test",
		Price:           1.0,
		CakeIngredients: []models.CakeIngredients{{ProductId: 1, Quantity: 1}},
	}

	want, err := app.Create(context.Background(), data)

	if err != nil {
		t.Fatalf("expected nil, got %v", err)
	}

	got, err := app.GetAllByStatus(context.Background(), true)

	if err != nil {
		t.Fatalf("expected nil, got %v", err)
	}

	if len(got) != 1 {
		t.Errorf("expected len(got) == 1, got %v", len(got))
	}

	if got[0].Id != want.Id {
		t.Errorf("expected got[0].Id == want.Id, got %v", got[0].Id)
	}
}

func TestCake_ChangeStatus(t *testing.T) {
	repo := new(cakeRepoInMemory)
	app := NewCakeApp(repo)

	if err := app.ChangeStatus(context.Background(), 0, false); err == nil {
		t.Fatalf("expected nil, got %v", err)
	}

	data := &models.Cake{
		Name:            "test",
		Description:     "test",
		Price:           1.0,
		CakeIngredients: []models.CakeIngredients{{ProductId: 1, Quantity: 1}},
	}

	want, err := app.Create(context.Background(), data)

	if err != nil {
		t.Fatalf("expected nil, got %v", err)
	}

	if err = app.ChangeStatus(context.Background(), want.Id, false); err != nil {
		t.Fatalf("expected nil, got %v", err)
	}

	got, err := app.GetById(context.Background(), want.Id)

	if err != nil {
		t.Fatalf("expected nil, got %v", err)
	}

	if got.Status != false {
		t.Errorf("expected got.Status == false, got %v", got.Status)
	}
}

func TestCake_Update(t *testing.T) {
	repo := new(cakeRepoInMemory)
	app := NewCakeApp(repo)

	if _, err := app.Update(context.Background(), 0, new(models.Cake)); err == nil {
		t.Fatalf("expected %v, got nil", err)
	}

	data := &models.Cake{
		Name:            "test",
		Description:     "test",
		Price:           1.0,
		CakeIngredients: []models.CakeIngredients{{ProductId: 1, Quantity: 1}},
	}

	cake, err := app.Create(context.Background(), data)

	if err != nil {
		t.Fatalf("expected error nil, got %v", err)
	}

	want := *cake
	want.Name = "test2"

	got, err := app.Update(context.Background(), want.Id, &want)
	if err != nil {
		t.Fatalf("expected error nil, got %v", err)
	}

	if got.Name != want.Name {
		t.Errorf("expected name = %v, got %v", want.Name, got.Name)
	}

}
func TestCake_GetById(t *testing.T) {
	repo := new(cakeRepoInMemory)
	app := NewCakeApp(repo)

	_, err := app.GetById(context.Background(), 0)

	if err == nil {
		t.Fatalf("expected %v, got nil", err)
	}

	data := new(models.Cake)
	data.Name = "test"
	data.Description = "test"
	data.Price = 1.0
	data.CakeIngredients = []models.CakeIngredients{{ProductId: 1, Quantity: 1}}

	want, err := app.Create(context.Background(), data)

	if err != nil {
		t.Fatalf("expected error nil, got %v", err)
	}

	got, err := app.GetById(context.Background(), want.Id)

	if err != nil {
		t.Fatalf("expected error nil, got %v", err)
	}

	if got.Id != want.Id {
		t.Errorf("expected id %v, got %v", want.Id, got.Id)
	}
}
