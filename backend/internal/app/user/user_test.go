package user

import (
	"context"
	"testing"

	"github.com/matherique/cakesie.app-backend/internal/models"
)

type userRepoInMemory struct {
	users []*models.User
}

func (u *userRepoInMemory) Insert(ctx context.Context, data *models.User) error {
	data.Id = len(u.users) + 1
	return nil
}

type hasher struct{}

func (h *hasher) Hash(data []byte) ([]byte, error) {
	return []byte("hashed"), nil
}

func (h *hasher) Validate(data []byte, hash []byte) bool {
	return true
}

func TestUser_Create(t *testing.T) {
	repo := new(userRepoInMemory)
	hasher := new(hasher)
	app := NewUserApp(repo, hasher)

	data := new(models.User)

	if _, err := app.Create(context.Background(), data); err == nil {
		t.Fatalf("expected validate error, got nil")
	}

	pass := "any_password"

	data.Email = "any_email@teste.com"
	data.Password = pass
	data.Name = "any_name"
	data.Phone = "999999999"

	got, err := app.Create(context.Background(), data)

	if err != nil {
		t.Fatalf("expected error nil, got %v", err)
	}

	if got.Id == 0 {
		t.Fatalf("expected id to be set, got %v", got.Id)
	}

	if got.Password == pass {
		t.Fatalf("expected password to be hashed, got %v", got.Password)
	}

}
