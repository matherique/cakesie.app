package cake

import (
	"context"
	"fmt"
	"testing"

	"github.com/google/go-cmp/cmp"
	"github.com/matherique/cakesie.app-backend/internal/models"
)

type spyRepo struct {
	called int
	err    error
	cake   *models.Cake
}

func (s *spyRepo) Insert(ctx context.Context, cake *models.Cake) error {
	if s.err != nil {
		return s.err
	}

	*cake = *s.cake
	return s.err
}

func (s *spyRepo) GetAllByStatus(ctx context.Context, status bool) ([]*models.Cake, error) {
	if s.err != nil {
		return nil, s.err
	}

	return []*models.Cake{s.cake}, s.err
}

func (s *spyRepo) UpdateStatus(ctx context.Context, id int, status bool) error {
	if s.err != nil {
		return s.err
	}

	return s.err
}

func (s *spyRepo) Update(ctx context.Context, id int, cake *models.Cake) error {
	if s.err != nil {
		return s.err
	}

	*cake = *s.cake
	return s.err
}

func (s *spyRepo) GetById(ctx context.Context, id int) (*models.Cake, error) {
	if s.err != nil {
		return nil, s.err
	}

	return s.cake, nil
}

func TestCake_Create(t *testing.T) {
	tt := []struct {
		name    string
		data    *models.Cake
		expect  *models.Cake
		err     error
		prepare func(repo *spyRepo)
	}{
		{
			name: "should return an error if missing name",
			data: &models.Cake{
				Price:       1,
				Description: "desc",
				CakeIngredients: []models.CakeIngredients{
					{ProductId: 1, Quantity: 1},
				},
			},
			expect:  nil,
			err:     NameRequiredError,
			prepare: func(repo *spyRepo) {},
		},
		{
			name: "should return an error if missing price",
			data: &models.Cake{
				Name:        "any_cake",
				Description: "desc",
				CakeIngredients: []models.CakeIngredients{
					{ProductId: 1, Quantity: 1},
				},
			},
			expect:  nil,
			err:     PriceRequiredError,
			prepare: func(repo *spyRepo) {},
		},
		{
			name: "should return an error if missing description",
			data: &models.Cake{
				Name:  "any_cake",
				Price: 10.0,
				CakeIngredients: []models.CakeIngredients{
					{ProductId: 1, Quantity: 1},
				},
			},
			expect:  nil,
			err:     DescriptionRequiredError,
			prepare: func(repo *spyRepo) {},
		},
		{
			name: "should return an error if missing ingredients",
			data: &models.Cake{
				Name:        "any_cake",
				Price:       10.0,
				Description: "desc",
			},
			expect:  nil,
			err:     IngredientesRequiredError,
			prepare: func(repo *spyRepo) {},
		},
		{
			name: "should return an error if repository returns an error",
			data: &models.Cake{
				Name:        "any_cake",
				Price:       10.0,
				Description: "desc",
				CakeIngredients: []models.CakeIngredients{
					{ProductId: 1, Quantity: 1},
				},
			},
			expect: nil,
			err:    DefaultRepositoryError,
			prepare: func(repo *spyRepo) {
				repo.err = fmt.Errorf("any error")
			},
		},
		{
			name: "should return nil if everything is ok",
			data: &models.Cake{
				Name:        "any_cake",
				Price:       10.0,
				Description: "desc",
				CakeIngredients: []models.CakeIngredients{
					{ProductId: 1, Quantity: 1},
				},
			},
			expect: &models.Cake{
				Id:          1,
				Name:        "any_cake",
				Price:       10.0,
				Description: "desc",
				CakeIngredients: []models.CakeIngredients{
					{ProductId: 1, Quantity: 1},
				},
			},
			err: nil,
			prepare: func(repo *spyRepo) {
				repo.cake = &models.Cake{
					Id:          1,
					Name:        "any_cake",
					Price:       10.0,
					Description: "desc",
					CakeIngredients: []models.CakeIngredients{
						{ProductId: 1, Quantity: 1},
					},
				}
			},
		},
	}

	for _, test := range tt {
		t.Run(test.name, func(t *testing.T) {
			repo := &spyRepo{}
			app := NewCakeApp(repo)

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

func TestCake_GetAllByStatus(t *testing.T) {
	tt := []struct {
		name    string
		status  bool
		expect  []*models.Cake
		err     error
		prepare func(repo *spyRepo)
	}{
		{
			name:   "should return an error if repository returns an error",
			status: false,
			expect: nil,
			err:    DefaultRepositoryError,
			prepare: func(repo *spyRepo) {
				repo.err = fmt.Errorf("any error")
			},
		},
		{
			name:   "should return nil if everything is ok",
			status: true,
			expect: []*models.Cake{
				{
					Id:          1,
					Name:        "any_cake",
					Price:       10.0,
					Description: "desc",
					CakeIngredients: []models.CakeIngredients{
						{ProductId: 1, Quantity: 1},
					},
				},
			},
			err: nil,
			prepare: func(repo *spyRepo) {
				repo.cake = &models.Cake{
					Id:          1,
					Name:        "any_cake",
					Price:       10.0,
					Description: "desc",
					CakeIngredients: []models.CakeIngredients{
						{ProductId: 1, Quantity: 1},
					},
				}
			},
		},
	}

	for _, test := range tt {
		t.Run(test.name, func(t *testing.T) {
			repo := &spyRepo{}
			app := NewCakeApp(repo)

			test.prepare(repo)

			p, err := app.GetAllByStatus(context.Background(), test.status)

			if diff := cmp.Diff(test.err, err); diff != "" {
				t.Errorf("expected error to be %v, got: %v - %v", test.err, err, diff)
			}

			if diff := cmp.Diff(test.expect, p); diff != "" {
				t.Error(diff)
			}
		})
	}
}

func TestCake_ChangeStatus(t *testing.T) {
	tt := []struct {
		name    string
		id      int
		status  bool
		err     error
		prepare func(repo *spyRepo)
	}{
		{
			name:   "should return an error if missing id",
			status: false,
			err:    IdRequiredError,
			prepare: func(repo *spyRepo) {
				repo.err = fmt.Errorf("any error")
			},
		},
		{
			name:   "should return an error if repository returns an error",
			id:     1,
			status: false,
			err:    DefaultRepositoryError,
			prepare: func(repo *spyRepo) {
				repo.err = fmt.Errorf("any error")
			},
		},
		{
			name:    "should return nil if everything is ok",
			status:  true,
			id:      2,
			err:     nil,
			prepare: func(repo *spyRepo) {},
		},
	}

	for _, test := range tt {
		t.Run(test.name, func(t *testing.T) {
			repo := &spyRepo{}
			app := NewCakeApp(repo)

			test.prepare(repo)

			err := app.ChangeStatus(context.Background(), test.id, test.status)

			if diff := cmp.Diff(test.err, err); diff != "" {
				t.Errorf("expected error to be %v, got: %v - %v", test.err, err, diff)
			}
		})
	}
}

func TestCake_Update(t *testing.T) {
	tt := []struct {
		name    string
		id      int
		data    *models.Cake
		err     error
		prepare func(repo *spyRepo)
	}{
		{
			name: "should return an error if missing id",
			data: &models.Cake{},
			err:  IdRequiredError,
			prepare: func(repo *spyRepo) {
				repo.err = fmt.Errorf("any error")
			},
		},
		{
			name: "should return an error if repository returns an error",
			id:   1,
			data: &models.Cake{},
			err:  DefaultRepositoryError,
			prepare: func(repo *spyRepo) {
				repo.err = fmt.Errorf("any error")
			},
		},
		{
			name: "should return nil if everything is ok",
			data: &models.Cake{},
			id:   2,
			err:  nil,
			prepare: func(repo *spyRepo) {
				repo.cake = &models.Cake{
					Id:          2,
					Name:        "any_cake",
					Price:       10.0,
					Description: "desc",
					CakeIngredients: []models.CakeIngredients{
						{ProductId: 1, Quantity: 1},
					},
				}
			},
		},
	}

	for _, test := range tt {
		t.Run(test.name, func(t *testing.T) {
			repo := &spyRepo{}
			app := NewCakeApp(repo)

			test.prepare(repo)

			_, err := app.Update(context.Background(), test.id, test.data)

			if diff := cmp.Diff(test.err, err); diff != "" {
				t.Errorf("expected error to be %v, got: %v - %v", test.err, err, diff)
			}
		})
	}
}

func TestCake_GetById(t *testing.T) {
	tt := []struct {
		name    string
		id      int
		data    *models.Cake
		err     error
		prepare func(repo *spyRepo)
	}{
		{
			name: "should return an error if missing id",
			data: &models.Cake{},
			err:  IdRequiredError,
			prepare: func(repo *spyRepo) {
				repo.err = fmt.Errorf("any error")
			},
		},
		{
			name: "should return an error if repository returns an error",
			id:   1,
			data: &models.Cake{},
			err:  DefaultRepositoryError,
			prepare: func(repo *spyRepo) {
				repo.err = fmt.Errorf("any error")
			},
		},
		{
			name: "should return nil if everything is ok",
			data: &models.Cake{},
			id:   2,
			err:  nil,
			prepare: func(repo *spyRepo) {
				repo.cake = &models.Cake{
					Id:          2,
					Name:        "any_cake",
					Price:       10.0,
					Description: "desc",
					CakeIngredients: []models.CakeIngredients{
						{ProductId: 1, Quantity: 1},
					},
				}
			},
		},
	}

	for _, test := range tt {
		t.Run(test.name, func(t *testing.T) {
			repo := &spyRepo{}
			app := NewCakeApp(repo)

			test.prepare(repo)

			_, err := app.GetById(context.Background(), test.id)

			if diff := cmp.Diff(test.err, err); diff != "" {
				t.Errorf("expected error to be %v, got: %v - %v", test.err, err, diff)
			}
		})
	}
}
