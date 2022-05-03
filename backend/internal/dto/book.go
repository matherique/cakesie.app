package dto

import (
	"fmt"

	"github.com/matherique/cakesie.app-backend/internal/models"
)

type ReqNewBook struct {
	Name        string `json:"name"`
	AuthorId    int    `json:"author_id"`
	ShortDesc   string `json:"short_desc"`
	Longdesc    string `json:"long_desc"`
	CategoryId  int    `json:"category_id"`
	PaperBack   int    `json:"paperback"`
	PublisherId int    `json:"publisher_id"`
}

func (rnw ReqNewBook) ToBook() *models.Book {
	return &models.Book{
		Name:        rnw.Name,
		AuthorId:    rnw.AuthorId,
		ShortDesc:   rnw.ShortDesc,
		Longdesc:    rnw.Longdesc,
		CategoryId:  rnw.CategoryId,
		PaperBack:   rnw.PaperBack,
		PublisherId: rnw.PublisherId,
	}
}

func (rnw *ReqNewBook) Validate() error {
	switch true {
	case rnw.Name == "":
		return fmt.Errorf("missing name")
	case rnw.ShortDesc == "":
		return fmt.Errorf("missing short_desc")
	case rnw.PaperBack == 0:
		return fmt.Errorf("missing paperback")
	case rnw.PublisherId == 0:
		return fmt.Errorf("missing publisher_id")
	case rnw.AuthorId == 0:
		return fmt.Errorf("missing author_id")
	case rnw.CategoryId == 0:
		return fmt.Errorf("missing category_id")
	}

	return nil
}
