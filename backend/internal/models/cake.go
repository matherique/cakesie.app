package models

type CakeIngredients struct {
	ProductId int `json:"product_id,omitempty"`
	Quantity  int `json:"quantity,omitempty"`
}

type Cake struct {
	Id              int               `json:"Id,omitempty"`
	Name            string            `json:"Name,omitempty"`
	Price           float64           `json:"Photo,omitempty"`
	Description     string            `json:"Description,omitempty"`
	Status          bool              `json:"Status,omitempty"`
	Ingredients     []*Ingredient     `json:"Ingredientes,omitempty"`
	CakeIngredients []CakeIngredients `json:"CakeIngredients,omitempty"`
}
