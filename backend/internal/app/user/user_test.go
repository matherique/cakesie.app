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
	u.users = append(u.users, data)
	return nil
}

func (u *userRepoInMemory) GetById(ctx context.Context, id int) (*models.User, error) {
	user := u.users[id-1]

	user.Password = ""

	return user, nil
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

func TestUser_GetById(t *testing.T) {
	repo := new(userRepoInMemory)
	hasher := new(hasher)
	app := NewUserApp(repo, hasher)

	var data models.User
	data.Email = "any_email@teste.com"
	data.Password = "any_password"
	data.Name = "any_name"
	data.Phone = "999999999"

	user, err := app.Create(context.Background(), &data)

	if err != nil {
		t.Fatalf("expected error nil, got %v", err)
	}

	got, err := app.GetById(context.Background(), 1)
	if err != nil {
		t.Fatalf("expected error nil, got %v", err)
	}

	if len(got.Password) != 0 {
		t.Fatalf("expected password to be empty, got %v", got.Password)
	}

	if got.Id != user.Id {
		t.Fatalf("expected id to be %v, got %v", user.Id, got.Id)
	}

	if got.Email != data.Email {
		t.Fatalf("expected email to be %v, got %v", user.Email, got.Email)
	}

}
