package cake_test

import (
	"context"
	"errors"
	"testing"

	"github.com/matherique/cakesie.app-backend/internal/app/cake"
	"github.com/matherique/cakesie.app-backend/internal/models"
)

type spyRepo struct {
	called int
	resp   error
}

func (s *spyRepo) Insert(ctx context.Context, cake *models.Cake) error {
	s.called++
	return s.resp
}

func TestCake_New(t *testing.T) {
	repo := &spyRepo{}

	tt := []struct {
		desc  string
		name  string
		price float64
		cake  *models.Cake
		err   error
	}{
		{
			desc:  "should return an error if the repository returns an error",
			name:  "",
			price: 0,
			cake:  nil,
			err:   errors.New("custom error"),
		},
	}

	ctx := context.Background()
	for _, test := range tt {
		t.Run(test.desc, func(t *testing.T) {
			repo.resp = test.err
			app := cake.NewCakeApp(repo)
			c, err := app.New(ctx, test.name, test.price)

			if err != test.err {
				t.Errorf("expected error %s, got %s", test.err, err)
			}

			if c != test.cake {
				t.Errorf("expected cake %v, got %v", test.cake, c)
			}
		})
	}
}
