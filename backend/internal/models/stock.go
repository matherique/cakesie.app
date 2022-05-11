package models

import "time"

type Stock struct {
	Id        int
	ProductId int
	Quantity  int
	AddedAt   time.Time
	Product   *Product
}

type StockStatistics struct {
	Product  *Product
	Quantity int
}
