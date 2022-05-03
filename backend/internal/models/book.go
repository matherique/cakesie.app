package models

import (
	"time"
)

type Book struct {
	Id          int       `json:"id,omitempty"`
	Name        string    `json:"name,omitempty"`
	Photo       string    `json:"photo,omitempty"`
	AuthorId    int       `json:"author_id,omitempty"`
	ShortDesc   string    `json:"short_desc,omitempty"`
	Longdesc    string    `json:"long_desc,omitempty"`
	CategoryId  int       `json:"category_id,omitempty"`
	PaperBack   int       `json:"paperback,omitempty"`
	PublisherId int       `json:"publisher_id,omitempty"`
	CreatedAt   time.Time `json:"created_at,omitempty"`
	UpdatedAt   time.Time `json:"updated_at,omitempty"`
}
