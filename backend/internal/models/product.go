package models

type Product struct {
	Id       int    `json:"id,omitempty"`
	Name     string `json:"name,omitempty"`
	Quantity int    `json:"quantity,omitempty"`
}
