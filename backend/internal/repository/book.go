package repository

import (
	"context"
	"fmt"

	"github.com/matherique/cakesie.app-backend/internal/models"
	"github.com/matherique/cakesie.app-backend/pkg/store"
)

type BookRepo interface {
	Create(ctx context.Context, book *models.Book) (*models.Book, error)
}

type bookRepo struct {
	store store.Store
}

func NewBookRepo(store store.Store) BookRepo {
	br := new(bookRepo)

	br.store = store

	return br
}

func (br *bookRepo) Create(ctx context.Context, book *models.Book) (*models.Book, error) {
	dml := `INSERT INTO book 
	(Name, Photo, AuthorId, ShortDesc, Longdesc, CategoryId, PapaerBack, Public) 
	VALUES (?,?,?,?,?,?,?,?) RETURNING *`

	var newBook models.Book

	if err := br.store.DB().QueryRowContext(ctx, dml).Scan(&newBook); err != nil {
		return nil, fmt.Errorf("could not create new book: %v", err)
	}

	return &newBook, nil
}
