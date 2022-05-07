package product

import (
	"context"

	"testing"

	"github.com/matherique/cakesie.app-backend/pkg/errors"

	"github.com/google/go-cmp/cmp"
	"github.com/matherique/cakesie.app-backend/internal/models"
)

type spyRepo struct {
	resp     error
	product  *models.Product
	products []models.Product
}

func (s *spyRepo) Insert(_ context.Context, data *models.Product) error {
	if s.resp != nil {
		return s.resp
	}
	*data = *s.product
	return nil
}

func (s *spyRepo) Update(ctx context.Context, id int, data *models.Product) error {
	if s.resp != nil {
		return s.resp
	}
	*data = *s.product
	return nil
}

func (s *spyRepo) GetById(ctx context.Context, id int) (*models.Product, error) {
	return s.product, s.resp
}

func (s *spyRepo) GetAll(ctx context.Context) ([]models.Product, error) {
	return s.products, s.resp
}

func (s *spyRepo) Search(ctx context.Context, name string) ([]models.Product, error) {
	return s.products, s.resp
}

func TestProduct_Create(t *testing.T) {
	tt := []struct {
		name    string
		data    *models.Product
		expect  *models.Product
		err     error
		prepare func(repo *spyRepo)
	}{
		{
			name:    "should return an error if missing name",
			data:    &models.Product{Quantity: 1},
			expect:  nil,
			err:     ErrNameRequired,
			prepare: func(repo *spyRepo) {},
		},
		{
			name:    "should return an error if missing quantity",
			data:    &models.Product{Name: "any_name"},
			expect:  nil,
			err:     ErrQuantityRequired,
			prepare: func(repo *spyRepo) {},
		},
		{
			name:   "should return an error if repository returns an error",
			data:   &models.Product{Name: "any_name", Quantity: 1},
			expect: nil,
			err:    errors.NewInternalServerError("custom error"),
			prepare: func(repo *spyRepo) {
				repo.resp = errors.NewInternalServerError("custom error")
			},
		},
		{
			name:   "should return nil if everything is ok",
			data:   &models.Product{Name: "any_name", Quantity: 1},
			expect: &models.Product{Id: 1, Name: "any_name", Quantity: 1},
			err:    nil,
			prepare: func(repo *spyRepo) {
				repo.product = &models.Product{Id: 1, Name: "any_name", Quantity: 1}
			},
		},
	}

	for _, test := range tt {
		t.Run(test.name, func(t *testing.T) {
			repo := &spyRepo{}
			app := NewProductApp(repo)

			test.prepare(repo)

			p, err := app.Create(context.Background(), test.data)

			if diff := cmp.Diff(test.err, err); diff != "" {
				t.Errorf("expected error to be %v, got: %v - %v", test.err, err, diff)
			}

			if diff := cmp.Diff(test.expect, p); diff != "" {
				t.Error(diff)
			}
		})
	}
}

func TestProduct_Update(t *testing.T) {
	tt := []struct {
		name    string
		data    *models.Product
		expect  *models.Product
		err     error
		prepare func(repo *spyRepo)
	}{
		{
			name:    "should return an error if missing id",
			data:    &models.Product{Name: "any_name", Quantity: 1},
			expect:  nil,
			err:     ErrIdRequired,
			prepare: func(repo *spyRepo) {},
		},
		{
			name:   "should return an error if repository returns an error",
			data:   &models.Product{Id: 2, Name: "any_name", Quantity: 1},
			expect: nil,
			err:    errors.NewInternalServerError("custom error"),
			prepare: func(repo *spyRepo) {
				repo.resp = errors.NewInternalServerError("custom error")
			},
		},
		{
			name:   "should return nil if everything is ok",
			data:   &models.Product{Id: 1, Name: "any_name"},
			expect: &models.Product{Id: 1, Name: "any_name", Quantity: 1},
			err:    nil,
			prepare: func(repo *spyRepo) {
				repo.product = &models.Product{Id: 1, Name: "any_name", Quantity: 1}
			},
		},
	}

	for _, test := range tt {
		t.Run(test.name, func(t *testing.T) {
			repo := &spyRepo{}
			app := NewProductApp(repo)

			test.prepare(repo)

			p, err := app.Update(context.Background(), test.data)

			if diff := cmp.Diff(test.err, err); diff != "" {
				t.Errorf("expected error to be %v, got: %v \n %v", test.err, err, diff)
			}

			if diff := cmp.Diff(test.expect, p); diff != "" {
				t.Errorf("expect product %v, got: %v \n %v", test.expect, p, diff)
			}

		})
	}
}

func TestProduct_Get(t *testing.T) {
	tt := []struct {
		name    string
		id      int
		expect  *models.Product
		err     error
		prepare func(repo *spyRepo)
	}{
		{
			name:    "should return an error if missing id",
			id:      0,
			expect:  nil,
			err:     ErrIdRequired,
			prepare: func(repo *spyRepo) {},
		},
		{
			name:   "should return an error if repository returns an error",
			id:     1,
			expect: nil,
			err:    errors.NewInternalServerError("custom error"),
			prepare: func(repo *spyRepo) {
				repo.resp = errors.NewInternalServerError("custom error")
			},
		},
	}

	for _, test := range tt {
		t.Run(test.name, func(t *testing.T) {
			repo := &spyRepo{}
			app := NewProductApp(repo)

			test.prepare(repo)

			p, err := app.Get(context.Background(), test.id)

			if diff := cmp.Diff(test.err, err); diff != "" {
				t.Errorf("expected error to be %v, got: %v \n %v", test.err, err, diff)
			}

			if diff := cmp.Diff(test.expect, p); diff != "" {
				t.Errorf("expect product %v, got: %v \n %v", test.expect, p, diff)
			}
		})
	}
}

func TestProduct_GetAll(t *testing.T) {
	tt := []struct {
		name    string
		expect  []models.Product
		err     error
		prepare func(repo *spyRepo)
	}{
		{
			name:   "should return an error if repository returns an error",
			expect: []models.Product{},
			err:    errors.NewInternalServerError("custom error"),
			prepare: func(repo *spyRepo) {
				repo.resp = errors.NewInternalServerError("custom error")
			},
		},
		{
			name: "should return all products",
			expect: []models.Product{
				{Id: 1, Name: "product_1", Quantity: 2},
				{Id: 2, Name: "product_2", Quantity: 2},
			},
			err: errors.NewInternalServerError("custom error"),
			prepare: func(repo *spyRepo) {
				repo.products = []models.Product{
					{Id: 1, Name: "product_1", Quantity: 2},
					{Id: 2, Name: "product_2", Quantity: 2},
				}
			},
		},
	}

	for _, test := range tt {
		t.Run(test.name, func(t *testing.T) {
			repo := &spyRepo{}
			app := NewProductApp(repo)

			test.prepare(repo)

			p, err := app.GetAll(context.Background())

			if diff := cmp.Diff(test.err, err); diff != "" {
				t.Errorf("expected error to be %v, got: %v \n %v", test.err, err, diff)
			}

			if diff := cmp.Diff(test.expect, p); diff != "" {
				t.Errorf("expect product %v, got: %v \n %v", test.expect, p, diff)
			}
		})
	}
}

func TestProduct_Search(t *testing.T) {
	tt := []struct {
		name    string
		data    string
		expect  []models.Product
		err     error
		prepare func(repo *spyRepo)
	}{
		{
			name:   "should return an error if repository returns an error",
			data:   "any",
			expect: []models.Product{},
			err:    errors.NewInternalServerError("custom error"),
			prepare: func(repo *spyRepo) {
				repo.resp = errors.NewInternalServerError("custom error")
			},
		},
		{
			name: "should return all products",
			data: "product",
			expect: []models.Product{
				{Id: 1, Name: "product_1", Quantity: 2},
				{Id: 2, Name: "product_2", Quantity: 2},
			},
			err: nil,
			prepare: func(repo *spyRepo) {
				repo.products = []models.Product{
					{Id: 1, Name: "product_1", Quantity: 2},
					{Id: 2, Name: "product_2", Quantity: 2},
				}
			},
		},
	}

	for _, test := range tt {
		t.Run(test.name, func(t *testing.T) {
			repo := &spyRepo{}
			app := NewProductApp(repo)

			test.prepare(repo)

			p, err := app.Search(context.Background(), test.data)

			if diff := cmp.Diff(test.err, err); diff != "" {
				t.Errorf("expected error to be %v, got: %v \n %v", test.err, err, diff)
			}

			if diff := cmp.Diff(test.expect, p); diff != "" {
				t.Errorf("expect product %v, got: %v \n %v", test.expect, p, diff)
			}
		})
	}
}
