package models

import (
	"time"
)

type Cake struct {
	Id        int       `json:"id,omitempty"`
	Name      string    `json:"name,omitempty"`
	Price     float64   `json:"photo,omitempty"`
	CreatedAt time.Time `json:"created_at,omitempty"`
	UpdatedAt time.Time `json:"updated_at,omitempty"`
}
