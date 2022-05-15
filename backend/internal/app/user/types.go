package user

type TokenData struct {
	Id    int    `json:"id,omitempty"`
	Token string `json:"token,omitempty"`
	Name  string `json:"name,omitempty"`
}
