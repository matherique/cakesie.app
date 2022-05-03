package app

import (
	"context"
	"log"

	proto "github.com/matherique/cakesie.app-backend/internal/proto/book"
	"github.com/matherique/cakesie.app-backend/internal/repository"
	"github.com/matherique/cakesie.app-backend/pkg/store"
	"github.com/matherique/cakesie.app-backend/pkg/utils"
)

type Book struct {
	proto.UnimplementedBookServiceServer

	log  *log.Logger
	repo repository.BookRepo
}

func (b *Book) Create(ctx context.Context, data *proto.CreateData) (*proto.Book, error) {
	b.log.Println("Create")
	return nil, nil
}

func (b *Book) Update(ctx context.Context, data *proto.UpdateData) (*proto.Book, error) {
	b.log.Println("Update")
	return nil, nil
}

func (b *Book) FindAll(ctx context.Context, empty *proto.Empty) (*proto.BookList, error) {
	b.log.Println("FindAll")
	return nil, nil
}

func (b *Book) Find(ctx context.Context, data *proto.FindData) (*proto.Book, error) {
	b.log.Println("Find")
	return nil, nil
}

func NewBookService(store store.Store) *Book {
	b := new(Book)
	b.repo = repository.NewBookRepo(store)
	b.log = utils.NewLogger("BOOK")

	return b
}
