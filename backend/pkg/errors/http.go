package errors

type HttpError struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
}

func NewHttp(status int, message string) HttpError {
	return HttpError{
		Status:  status,
		Message: message,
	}
}

func (he HttpError) Error() string {
	return he.Message
}
