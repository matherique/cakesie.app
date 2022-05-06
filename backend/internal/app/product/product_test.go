package product

import (
	"context"
	"errors"
	"testing"

	"github.com/google/go-cmp/cmp"
	"github.com/matherique/cakesie.app-backend/internal/models"
)

type spyRepo struct {
	called int
	resp   error
}

func (s *spyRepo) Insert(context.Context, *models.Product) error {
	s.called++
	return s.resp
}

func TestProduct_Create(t *testing.T) {
	tt := []struct {
		name   string
		data   *models.Product
		expect *models.Product
		err    error
	}{
		{
			name:   "should return an error if missing name",
			data:   &models.Product{Quantity: 1},
			expect: nil,
			err:    ErrNameRequired,
		},
		{
			name:   "should return an error if missing quantity",
			data:   &models.Product{Name: "any_name"},
			expect: nil,
			err:    ErrQuantityRequired,
		},
		{
			name:   "should return an error if repository returns an error",
			data:   &models.Product{Name: "any_name", Quantity: 1},
			expect: nil,
			err:    errors.New("custom error"),
		},
		{
			name:   "should return nil if everything is ok",
			data:   &models.Product{Name: "any_name", Quantity: 1},
			expect: &models.Product{Name: "any_name", Quantity: 1},
			err:    nil,
		},
	}

	for _, test := range tt {
		t.Run(test.name, func(t *testing.T) {
			repo := &spyRepo{}
			app := NewProductApp(repo)
			repo.resp = test.err

			p, err := app.Create(context.Background(), test.data)

			if !errors.Is(err, test.err) {
				t.Error("expected error to be equal to test.err")
			}

			if diff := cmp.Diff(test.expect, p); diff != "" {
				t.Error(diff)
			}

		})
	}
}
