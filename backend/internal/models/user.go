package models

type User struct {
	Id    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
	Phone string `json:"phone"`
	// TODO: change later to use array
	Address  []string `json:"address"`
	Password string   `json:"password"`
}
