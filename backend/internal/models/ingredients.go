package models

type Ingredients struct {
	CakeId    int `json:"cake_id,omitempty"`
	ProductId int `json:"product_id,omitempty"`
	Quantity  int `json:"quantity,omitempty"`
}
