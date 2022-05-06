package product

import (
	"context"

	"testing"

	"github.com/matherique/cakesie.app-backend/pkg/errors"

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

func (s *spyRepo) Update(context.Context, int, *models.Product) error {
	s.called++
	return s.resp
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
			name:    "should return nil if everything is ok",
			data:    &models.Product{Name: "any_name", Quantity: 1},
			expect:  &models.Product{Name: "any_name", Quantity: 1},
			err:     nil,
			prepare: func(repo *spyRepo) {},
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
