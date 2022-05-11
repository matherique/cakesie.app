package errors

import "net/http"

type NotFound struct {
	Mode    int    `json:"code"`
	Message string `json:"message"`
}

func (m *NotFound) Error() string {
	return m.Message
}

func NewNotFound(message string) error {
	return &NotFound{http.StatusNotFound, message}
}

type BadRequest struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

func NewBadRequest(message string) error {
	return &BadRequest{http.StatusBadRequest, message}
}

func (m *BadRequest) Error() string {
	return m.Message
}

type InternalServerError struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

func NewInternalServerError(message string) error {
	return &InternalServerError{http.StatusInternalServerError, message}
}

func (m *InternalServerError) Error() string {
	return m.Message
}
