package user

import (
	"bytes"
	"context"
	"fmt"
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

func (u *userRepoInMemory) GetAll(ctx context.Context) ([]*models.User, error) {
	users := make([]*models.User, len(u.users))

	for i, user := range u.users {
		user.Password = ""
		users[i] = user
	}

	return users, nil
}

func (u *userRepoInMemory) FindByEmail(ctx context.Context, email string) (*models.User, error) {
	for _, user := range u.users {
		if user.Email == email {
			return user, nil
		}
	}

	return nil, fmt.Errorf("not found")
}

type hasher struct {
	unhashed []byte
}

func (h *hasher) Hash(data []byte) ([]byte, error) {
	h.unhashed = data
	return []byte("hashed"), nil
}

func (h *hasher) Validate(data []byte, hash []byte) bool {
	return bytes.Compare(data, h.unhashed) == 0
}

type token struct{}

func (*token) Generate(data ...interface{}) ([]byte, error) {
	return []byte("token"), nil
}

func (*token) Validate(data []byte, hash []byte) bool {
	return true
}

func TestUser_Create(t *testing.T) {
	repo := new(userRepoInMemory)
	hasher := new(hasher)
	token := new(token)
	app := NewUserApp(repo, hasher, token)

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
	token := new(token)
	app := NewUserApp(repo, hasher, token)

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

func TestUser_GetAll(t *testing.T) {
	repo := new(userRepoInMemory)
	hasher := new(hasher)
	token := new(token)
	app := NewUserApp(repo, hasher, token)

	var data models.User
	data.Name = "any_name"
	data.Email = "any_email@teste.com"
	data.Password = "any_password"
	data.Phone = "999999999"

	_, err := app.Create(context.Background(), &data)
	_, err = app.Create(context.Background(), &data)

	if err != nil {
		t.Fatalf("expected error nil, got %q", err)
	}

	got, err := app.GetAll(context.Background())

	if err != nil {
		t.Fatalf("expected error nil, got %q", err)
	}

	if len(got) != 2 {
		t.Fatalf("expected len to be 1, got %v", len(got))
	}

	if len(got[0].Password) > 0 && len(got[1].Password) > 0 {
		t.Fatal("expected password to be empty")
	}

}

func TestUser_Login(t *testing.T) {
	repo := new(userRepoInMemory)
	hasher := new(hasher)
	token := new(token)
	app := NewUserApp(repo, hasher, token)

	var data models.User
	data.Name = "any_name"
	data.Email = "any_email@teste.com"
	data.Password = "any_password"
	data.Phone = "999999999"

	_, err := app.Create(context.Background(), &data)
	if err != nil {
		t.Fatalf("expected error nil, got %q", err)
	}

	if _, err := app.Login(context.Background(), "error_email@teste.com", "any_password"); err == nil {
		t.Fatalf("expected error, got nil")
	}

	if _, err := app.Login(context.Background(), "any_email@teste.com", "wrong_password"); err == nil {
		t.Fatalf("expected error, got nil")
	}

	email := "any_email@teste.com"
	password := "any_password"

	got, err := app.Login(context.Background(), email, password)

	if err != nil {
		t.Fatalf("expected error nil, got %q", err)
	}

	if len(got.Token) == 0 {
		t.Fatal("expected token to be set")
	}

	if len(got.Name) == 0 {
		t.Fatal("expected name to be set")
	}

	if got.Id == 0 {
		t.Fatal("expected id to be set")
	}
}
