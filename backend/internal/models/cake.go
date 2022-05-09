package models

type Cake struct {
	Id           int      `json:"Id,omitempty"`
	Name         string   `json:"Name,omitempty"`
	Price        float64  `json:"Photo,omitempty"`
	Description  string   `json:"Description,omitempty"`
	Status       bool     `json:"Status,omitempty"`
	Ingredientes []string `json:"Ingredientes,omitempty"`
}
